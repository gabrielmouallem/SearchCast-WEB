import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Image from "next/image";
import api from "@/services/ApiService/ApiService";
import { LoginResponse } from "@/types";
import { useCookies } from "@/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export function GoogleLoginButton() {
  const cookies = useCookies("access_token", "");
  const router = useRouter();

  function onSuccess(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    const castedResponse = response as GoogleLoginResponse;

    api
      .post<LoginResponse>("/v1/google_login", {
        ...castedResponse.profileObj,
        google_response: castedResponse.getAuthResponse(),
      })
      .then(({ data }) => {
        cookies.updateCookie(data.access_token, 1);
        toast.info("Logado com sucesso!", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/search");
        return data;
      })
      .catch((err) => {
        toast.error("Erro ao entrar com o Google. Por favor tente novamente.", {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return err;
      })
      .finally(() => {});
  }

  function onFailure(e: any) {
    console.error(e);
    toast.error("Erro ao entrar com o Google. Por favor tente novamente.", {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      scope="profile email"
      render={(props) => (
        <button
          {...props}
          className="rounded-md border text-gray-300 border-border bg-background shadow-xs py-2.5 px-4 flex justify-center items-center gap-3 self-stretch disabled:opacity-50"
        >
          <Image
            priority
            className="rounded-full"
            src="/google_logo_icon.svg"
            width={24}
            height={24}
            placeholder="empty"
            title="Flow Podcast"
            alt="Flow Podcast"
          />
          Entrar com o Google
        </button>
      )}
    />
  );
}
