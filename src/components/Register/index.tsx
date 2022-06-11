import { FormEvent, useRef } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

const HOURSTOMINUTES = 60;
const MINUTESTOSECONDS = 60;
const SECONDSTOMILISECONDS = 1000;
const DAYSTOHOURS = 24;

export const Register = () => {
  const inputName = useRef<HTMLInputElement>(null);
  const inputGroupId = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputName.current || !inputGroupId.current) return;
    const { value: name } = inputName.current;
    const { value: groupId } = inputGroupId.current;
    const nameValidate = validateEmpty(name);
    const groupIdValidate = validateEmpty(groupId);
    if (nameValidate)
      return console.log("Nome curto demais");
    if (groupIdValidate)
      return console.log("Id do grupo preenchido errado");

    saveKeysOnLocalStorage(name, groupId);
    navigate(`/${groupId}`);
  };
  const getKeysFromLocalStorage = (): {
    name: string;
    groupId: string;
  } => {
    const name =
      window.localStorage.getItem("chat-websocket-name") ||
      "";
    const groupId =
      window.localStorage.getItem(
        "chat-websocket-groupId"
      ) || "";

    return { name, groupId };
  };
  const saveKeysOnLocalStorage = (
    name: string,
    groupId: string
  ) => {
    window.localStorage.setItem(
      "chat-websocket-name",
      name
    );
    window.localStorage.setItem(
      "chat-websocket-groupId",
      groupId
    );
  };

  const validateEmpty = (value: string) => {
    if (value.length < 1) return true;
    if (!value) return true;
  };
  return (
    <div className="register">
      <div className="register__card">
        <h3 className="register__card-title">
          Entre no Chat
        </h3>
        <form
          className="register__card-form"
          onSubmit={formSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">Nome: </label>
            <input
              type="text"
              name="name"
              autoFocus
              ref={inputName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="group-id">Id do grupo: </label>
            <input
              type="text"
              name="group-id"
              ref={inputGroupId}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};
