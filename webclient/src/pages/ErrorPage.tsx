import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = t("UNKNOWN_ERROR");
  }

  return (
    <div id="error-page">
      <h1>{t("OOPS")}</h1>
      <p>{t("UNEXPECTED_ERROR_OCCURED")}</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
