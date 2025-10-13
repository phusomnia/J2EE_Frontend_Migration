import { Modal } from "@/components/_Modal";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "@/stores/DialogStore";
import { useRef, useState, useCallback, useEffect } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageCroppingLayout() {
    const { isOpen, toggleModal } = useDialogStore();

    return (
        <>
            <Button onClick={toggleModal}>Upload anh</Button>
            <Modal>
                <div className="p-4">
                    <CropImage />
                </div>
            </Modal>
        </>
    );
}

function CropImage() {
    const [step, setStep] = useState<"choose" | "crop" | "preview">("choose");
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setSrc(reader.result as string);
                setStep("crop");
                setCrop(undefined);
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
            width: width < 200 ? width : 200,
            height: height < 200 ? height : 200,
        };
        setCrop(initialCrop);
        setCompletedCrop(initialCrop as PixelCrop);
    }, []);

    const updateCanvasPreview = useCallback(() => {
        if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );
    }, [completedCrop]);

    useEffect(() => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current) {
            updateCanvasPreview();
        }
    }, [completedCrop, updateCanvasPreview]);

    const handleCropComplete = (crop: PixelCrop) => {
        setCompletedCrop(crop);
    };

    const generateFinalCroppedImage = useCallback(async () => {
        if (!completedCrop || !previewCanvasRef.current) {
            return;
        }

        const canvas = previewCanvasRef.current;

        return new Promise<void>((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error("Canvas is empty");
                        return;
                    }
                    const url = URL.createObjectURL(blob);
                    setCroppedImageUrl(url);
                    setStep("preview");
                    resolve();
                },
                "image/jpeg",
                1
            );
        });
    }, [completedCrop]);

    const handleBackToChoose = () => {
        setStep("choose");
        setSrc(null);
        setCrop(undefined);
        setCompletedCrop(undefined);
        setCroppedImageUrl(null);
    };

    const handleBackToCrop = () => {
        setStep("crop");
    };

    useEffect(() => {
        return () => {
            if (croppedImageUrl) {
                URL.revokeObjectURL(croppedImageUrl);
            }
        };
    }, [croppedImageUrl]);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            {step === "choose" && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="mb-4"
                    />
                    <p className="text-gray-600">Choose an image to crop</p>
                </div>
            )}

            {step === "crop" && src && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Button onClick={handleBackToChoose} variant="outline">
                            Back
                        </Button>
                        <h2 className="text-lg font-semibold">
                            Crop your image
                        </h2>
                        <Button onClick={generateFinalCroppedImage}>
                            Confirm Crop
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                Crop Area
                            </h3>
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) =>
                                    setCrop(percentCrop)
                                }
                                onComplete={handleCropComplete}
                                aspect={1}
                                className="max-h-[50vh] border rounded"
                            >
                                <img
                                    src={src}
                                    ref={imgRef}
                                    onLoad={(e) => onImageLoad(e.currentTarget)}
                                    alt="Crop preview"
                                    style={{ maxHeight: "50vh", width: "auto" }}
                                />
                            </ReactCrop>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium mb-2">
                                Live Preview
                            </h3>
                            <div className="border rounded p-4 bg-gray-50">
                                {completedCrop &&
                                completedCrop.width > 0 &&
                                completedCrop.height > 0 ? (
                                    <div className="space-y-4">
                                        <div className="text-xs text-gray-600">
                                            Crop size:{" "}
                                            {Math.round(completedCrop.width)} ×{" "}
                                            {Math.round(completedCrop.height)}px
                                        </div>
                                        <canvas
                                            ref={previewCanvasRef}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "300px",
                                                width: "auto",
                                                height: "auto",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <p className="text-xs text-gray-500 text-center">
                                            Preview updates as you adjust the
                                            crop
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        Adjust the crop area to see preview
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === "preview" && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Button onClick={handleBackToCrop} variant="outline">
                            Back to Crop
                        </Button>
                        <h2 className="text-lg font-semibold">
                            Final Cropped Image
                        </h2>
                        <Button onClick={handleBackToChoose}>
                            Choose Another Image
                        </Button>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        {croppedImageUrl && (
                            <div className="text-center">
                                <img
                                    src={croppedImageUrl}
                                    alt="Cropped result"
                                    className="max-w-full max-h-[60vh] border rounded mx-auto"
                                />
                                <div className="mt-4">
                                    <Button
                                        onClick={() => {
                                            const link =
                                                document.createElement("a");
                                            link.download = "cropped-image.jpg";
                                            link.href = croppedImageUrl;
                                            link.click();
                                        }}
                                    >
                                        Download Cropped Image
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
