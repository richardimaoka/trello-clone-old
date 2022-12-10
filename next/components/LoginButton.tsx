interface LoginButtonProps {
  imageUrl: string;
  text: string;
}

export const LoginButton = ({ imageUrl, text }: LoginButtonProps) => {
  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "40px",
        padding: "0px 10px",
        color: "#42526E",
        backgroundColor: "white",
        fontWeight: "900",
        borderRadius: "3px",
        borderWidth: "2px",
        borderColor: "#dfe1e6",
        borderStyle: "solid",
        boxShadow: "rgb(0 0 0 / 10%) 0 0 10px",
      }}
    >
      <img
        width="18px"
        height="18px"
        style={{
          display: "block",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "18px",
        }}
        src={imageUrl}
      />
      <span style={{ display: "block", flexGrow: 1 }}>{text}</span>
    </button>
  );
};
