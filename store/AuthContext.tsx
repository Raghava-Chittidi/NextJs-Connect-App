import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";

const AuthContext = createContext({
  token: null as string | null,
  userData: { name: "", id: "", image: "" },
  isLoggedIn: false,
  login: (
    userData: { name: string; id: string; image: string },
    token: string
  ) => {},
  logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<null | string>(null);
  const [userData, setUserData] = useState<{
    name: string;
    id: string;
    image: string;
  }>({
    name: "",
    id: "",
    image: "",
  });
  const isLoggedIn = !!token;
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("token")) {
      router.push("/auth");
    } else if (!isLoggedIn && localStorage.getItem("token")) {
      login(
        JSON.parse(localStorage.getItem("userData")!),
        localStorage.getItem("token")!
      );
    }
  }, [isLoggedIn]);

  const login = useCallback(
    async (
      userLoginData: { name: string; id: string; image: string },
      token: string
    ) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userLoginData));
      setUserData(userLoginData);
      setToken(token);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
  }, []);

  const context = {
    token,
    userData,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
