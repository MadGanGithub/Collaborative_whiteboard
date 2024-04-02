import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: "http://localhost:3000/realms/myrealm/signin",
  realm: "myrealm",
  clientId: "myclient",
});

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    console.log(isRun)
    console.log(token)
    console.log("madhav")
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        if (client.token !== undefined) {
          setToken(client.token);
        }      
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;