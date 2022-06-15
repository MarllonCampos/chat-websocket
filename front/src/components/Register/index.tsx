import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmpty } from "../../helpers/validateString";

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

    const body = {
      name,
      groupId,
    };
    fetch("http://localhost:3003", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ name, groupName, groupId }) => {
        saveKeysOnLocalStorage({
          name,
          groupId,
          groupName,
        });

        // navigate(`/${groupName}`);
      })
      .catch(() => {
        console.error("Ocorreu um erro");
      });
  };
  interface ISaveKeysOnLocalStorage {
    name: string;
    groupName: string;
    groupId: string;
  }
  const saveKeysOnLocalStorage = ({
    name,
    groupName,
    groupId,
  }: ISaveKeysOnLocalStorage) => {
    window.localStorage.setItem(
      "chat-websocket-name",
      name
    );
    window.localStorage.setItem(
      "chat-websocket-groupName",
      groupName
    );
    window.localStorage.setItem(
      "chat-websocket-groupId",
      groupId
    );
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
