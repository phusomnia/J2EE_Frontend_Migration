class Metadata {
  static base_api: string = "http://localhost:8080/api/v1";
  static auth_url: string = "http://localhost:8080/oauth2/authorization/google";
  static base_url: string = "http://localhost:3000";

  constructor() {
    console.log("Metadata initialized");
  }

  static styling = (scale: number) => {
    return {
      name: 40 * scale,
      title: 35 * scale,
      sectionTitle: 20 * scale,
      paragraph: 15 * scale,
      icon: {
        size: 15 * scale,
        gap: 8 * scale,
      },
      image: {
        width: 200 * scale,
        height: 200 * scale,
      },
      border: {
        width: `${1 * scale}px`,
        margin: `${20 * scale}px`,
      },
    };
  };
}

export default Metadata;
