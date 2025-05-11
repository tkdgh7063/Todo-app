import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { DefaultValue } from "recoil";

// before usage of react-hook-form
// function TodoList() {
//   const [toDo, setToDo] = useState("");
//   const [error, setError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//     setError("");
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setError("Todo should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input placeholder="Write a todo" value={toDo} onChange={onChange} />
//         <button>Add</button>
//         {error !== "" ? error : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
  customError?: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "user@example.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Passwords do not match." },
        { shouldFocus: true }
      );
    }
    // setError("customError", { message: "Unknown Form Error." });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              domain: (value) =>
                value.endsWith(".com")
                  ? true
                  : "Email domain must end with '.com'",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/,
              message: "Invalid Email format.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message?.toString()}</span>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 10,
              message: "Password must be longer than 10 letters.",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message?.toString()}</span>
        <input
          {...register("passwordConfirm", {
            required: "Password Confirm is required.",
          })}
          placeholder="Password Confirm"
        />
        <span>{errors?.passwordConfirm?.message?.toString()}</span>
        <button>Add</button>
        <span>{errors?.customError?.message}</span>
      </form>
    </div>
  );
}

export default TodoList;
