import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveKeysOnLocalStorage } from "../../helpers/user";
import { validateEmpty } from "../../helpers/validateString";
import API_URL from "../../helpers/apiurl";
export const Register = () => {
  const inputName = useRef<HTMLInputElement>(null);
  const inputGroupName = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputName.current || !inputGroupName.current) return;
    const { value: name } = inputName.current;
    const { value: groupName } = inputGroupName.current;
    if (validateEmpty(name)) return console.log("Nome curto demais");
    if (validateEmpty(groupName)) return console.log("Id do grupo preenchido errado");

    const body = {
      name,
      groupName,
    };
    try {
      const response = await fetch(API_URL, {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bodyResponse = await response.json();
      const { groupId, userId } = await bodyResponse;
      saveKeysOnLocalStorage({
        name,
        groupId,
        groupName,
        userId,
      });

      navigate(`/${groupName}`);
    } catch (error) {
      console.error("Ocorreu um erro", error);
    }
  };

  return (
    <div className="register">
      <div className="register__card">
        <h3 className="register__card-title">Entre no Chat</h3>
        <form className="register__card-form" onSubmit={formSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome: </label>
            <input type="text" name="name" autoFocus ref={inputName} />
          </div>
          <div className="form-group">
            <label htmlFor="group-name">Id do grupo: </label>
            <input type="text" name="group-name" ref={inputGroupName} />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};
