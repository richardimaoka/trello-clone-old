import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useContext, useState } from "react";
import { FirebaseContext } from "../components/FirebaseContext";

const login = () => {
  const { auth } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user crated:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error: ", error);
        console.log(auth);
        // ..
      });
  };

  return (
    <div style={{ backgroundColor: "#f9fafc", height: "100vh" }}>
      <div>
        <img
          style={{ display: "block", width: "200px", margin: "40px auto" }}
          alt="Trello"
          src="/secret-images/logo.svg"
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "rgb(0 0 0 / 10%) 0 0 10px",
        }}
      >
        <form>
          <div>
            <input
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            アカウントを作成することにより、
            <Link href="https://google.com">利用規約</Link>および
            <Link href="https://google.com">プライバシーポリシー</Link>
            を読み、これに同意するものとします。
          </p>
          <button type="button" onClick={createUser}>
            サインアップ
          </button>
        </form>
        <Link href="/">home</Link>
      </div>
    </div>
  );
};

export default login;
