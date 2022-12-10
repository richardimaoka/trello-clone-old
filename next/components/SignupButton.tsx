interface SignupButtonProps {
  onclick: () => void;
}

export const SignUpButton = ({ onclick }: SignupButtonProps) => {
  return (
    <button
      type="button"
      style={{
        width: "100%",
        height: "40px",
        padding: "7px",
        backgroundColor: "#5AAC44",
        color: "white",
        borderRadius: "3px",
        borderWidth: "2px",
        borderColor: "#dfe1e6",
        borderStyle: "solid",
      }}
      onClick={onclick}
    >
      サインアップ
    </button>
  );
};
