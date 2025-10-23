import Modal from "@/components/_Modal";
import { Button } from "@/components/ui/button";
import { queryClient, useMutation } from "@/lib/ReactQuery";
import { useDialogStore } from "@/stores/DialogStore";
import { useRef, useState, useCallback, useEffect } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { metadata } from "@/utils/Api";
import { FormStore } from "@/stores/FormStore";

export default function ImageCroppingLayout() {
  const { toggleModal } = useDialogStore();
  const { setFormValue, formValue } = FormStore();

  const imageProfileSource = formValue?.ImageProfile;
  const initialCurrentImage =
    imageProfileSource &&
    (imageProfileSource.startsWith("http://") ||
      imageProfileSource.startsWith("https://"))
      ? imageProfileSource
      : null;

  console.log(initialCurrentImage);

  return (
    <>
      <Button
        onClick={() => {
          toggleModal();
        }}
      >
        Upload ảnh
      </Button>
      <Modal>
        <div className="p-4">
          <CropImage
            setFormValue={setFormValue}
            formValue={formValue}
            currentImage={initialCurrentImage}
            onClose={toggleModal}
          />
        </div>
      </Modal>
    </>
  );
}

function CropImage(props: any) {
  const [src, setSrc] = useState<string | null>(props.currentImage || null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(
    props.currentImage || null
  );
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setOriginalFile(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result as string);
        setCrop(undefined);
        setCroppedImageFile(file);
        setCroppedImageUrl(null);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    const { width, height } = img;
    const initialCrop: Crop = {
      unit: "px",
      x: 0,
      y: 0,
      width: Math.min(width, 300),
      height: Math.min(height, 300),
    };
    setCrop(initialCrop);
    setCompletedCrop(initialCrop as PixelCrop);
  }, []);

  const generateCroppedImage = useCallback(
    async (crop: PixelCrop) => {
      if (!imgRef.current) return;

      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise<File>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }

            const fileName = originalFile
              ? originalFile?.name
              : props.formValue.ImageProfile.split("/").pop();

            const file = new File(
              [blob],
              fileName.substring(0, fileName.lastIndexOf(".")),
              {
                type: "image/**",
                lastModified: Date.now(),
              }
            );

            const url = URL.createObjectURL(blob);
            setCroppedImageUrl(url);
            setCroppedImageFile(file);
            resolve(file);
          },
          "image/jpeg",
          1
        );
      });
    },
    [originalFile]
  );

  useEffect(() => {
    if (
      completedCrop &&
      completedCrop.width > 0 &&
      completedCrop.height > 0 &&
      src
    ) {
      generateCroppedImage(completedCrop);
    }
  }, [completedCrop, src, generateCroppedImage]);

  const handleCropComplete = useCallback((crop: PixelCrop) => {
    setCompletedCrop(crop);
  }, []);

  const handleSaveImage = useCallback(async () => {
    if (!croppedImageUrl) {
      if (src && originalFile) {
        props.setFormValue("ImageProfile", src);
        props.onClose();
        return;
      }
      return console.error("Không có ảnh để lưu");
    }

    const formData = new FormData();
    formData.append("file", croppedImageFile!, croppedImageFile?.name);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log(props.formValue);

    mutation.mutate(formData);
  }, [croppedImageUrl, src, originalFile, croppedImageFile]);

  const handleDownload = () => {
    if (!croppedImageUrl) return;

    const link = document.createElement("a");
    link.download = "cropped-image.jpg";
    link.href = croppedImageUrl;
    link.click();
  };

  const handleReset = () => {
    setSrc(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageFile(null);
    setCroppedImageUrl(null);
    setOriginalFile(null);
  };

  useEffect(() => {
    return () => {
      if (croppedImageUrl && croppedImageUrl !== props.currentImage) {
        URL.revokeObjectURL(croppedImageUrl);
      }
    };
  }, [croppedImageUrl, props.currentImage]);

  const mutation = useMutation(
    {
      mutationFn: async (data: FormData) => {
        console.log("Uploading image...");
        const response = await fetch(`${metadata.url}/storage/upload-image`, {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        return response.json();
      },
      onSuccess: (res: any) => {
        console.log("Upload successfully:", res);
        props.setFormValue("ImageProfile", res.data);
        props.onClose();
      },
      onError: (error: any) => {
        console.error("Upload error:", error);
      },
    },
    queryClient
  );

  const isImageSelected = !!src;

  return (
    <div className="">
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {!isImageSelected ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="sr-only"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                >
                  Chọn ảnh để crop
                </label>
              </div>
            ) : (
              <div className="flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={handleCropComplete}
                  aspect={1}
                  className="max-h-[50vh] border rounded"
                >
                  <img
                    src={src || ""}
                    ref={imgRef}
                    onLoad={(e) => onImageLoad(e.currentTarget)}
                    alt="Crop preview"
                    style={{ maxHeight: "50vh", width: "auto" }}
                    crossOrigin="anonymous"
                  />
                </ReactCrop>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* <h3 className="text-sm font-medium">Preview</h3> */}
            <div className="border rounded p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
              {croppedImageUrl ? (
                <div className="text-center space-y-4">
                  <img
                    src={croppedImageUrl}
                    alt="Cropped result"
                    className="max-w-full max-h-[250px] border rounded mx-auto"
                  />
                  <p className="text-xs text-gray-500">
                    Ảnh đã crop{" "}
                    {completedCrop &&
                      `(${Math.round(completedCrop.width)}×${Math.round(
                        completedCrop.height
                      )}px)`}
                  </p>
                </div>
              ) : src ? (
                <div className="text-center space-y-4">
                  <img
                    src={src}
                    alt="Original"
                    className="max-w-full max-h-[250px] border rounded mx-auto"
                  />
                  <p className="text-xs text-gray-500">
                    Ảnh gốc{" "}
                    {imgRef.current &&
                      `(${imgRef.current.naturalWidth}×${imgRef.current.naturalHeight}px)`}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Chưa có ảnh để preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer với các button */}
      <div className="flex justify-between items-center">
        <Button onClick={handleReset} variant="outline" size="sm">
          Chọn ảnh khác
        </Button>
        <div className="text-sm text-gray-600">
          {completedCrop &&
            `Crop: ${Math.round(completedCrop.width)}×${Math.round(
              completedCrop.height
            )}px`}
        </div>

        <Button
          onClick={() => {
            props.onClose();
          }}
          variant="outline"
        >
          Đóng
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={handleDownload}
            disabled={!croppedImageUrl}
            variant="outline"
          >
            Tải ảnh
          </Button>
          <Button onClick={handleSaveImage} disabled={!isImageSelected}>
            Lưu ảnh
          </Button>
        </div>
      </div>
    </div>
  );
}
