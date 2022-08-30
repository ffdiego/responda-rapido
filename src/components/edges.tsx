import { NormalButton } from "./buttons";

export function TitleBar({ text }) {
  return (
    <h1 className="text-center text-white text-xl font-semibold border-4 rounded-t-xl border-color3 bg-color3">
      {text}
    </h1>
  );
}

export function Footer({ btnText, btnClick, btnEnabled }) {
  return (
    <div className="border-4 border-color3 bg-green-700 py-2 drop-shadow-lg border-t-4 rounded-b-xl flex justify-end px-2">
      <NormalButton
        onClick={btnClick}
        className={btnEnabled ? "" : "opacity-50 cursor-not-allowed"}
        disabled={!btnEnabled}
      >
        {btnText}
      </NormalButton>
    </div>
  );
}
