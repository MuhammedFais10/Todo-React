import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { RiFileEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editid, setEditid] = useState(0);

  const addTodo = () => {
    if (input !== "") {
      setTodo([...todo, { list: input, id: Date.now(), status: false }]);
      console.log(todo);
      setInput("");
    }
    if (editid) {
      const editTodo = todo.find((input) => input.id === editid);
      const updateTodo = todo.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: input })
          : (to = { id: to.id, list: to.list })
      );

      setTodo(updateTodo);
      setEditid(0);
      setInput("");
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodo(JSON.parse(savedTodos));
    }
  }, []);
  useEffect(() => {
    console.log("Saving todos to localStorage");
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const handleSubimt = (e) => {
    e.preventDefault();
  };
  const onDelete = (id) => {
    setTodo(todo.filter((to) => to.id !== id));
  };
  const onComplete = (id) => {
    let complete = todo.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodo(complete);
  };
  const onEdit = (id) => {
    const editTodo = todo.find((to) => to.id === id);
    setInput(editTodo.list);
    setEditid(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubimt}>
        <input
          type="text"
          placeholder="Enter Your todo"
          className="form-control"
          value={input}
          ref={inputRef}
          onChange={(event) => setInput(event.target.value)}
        />

        <button onClick={addTodo}>{editid ? "Edit" : "ADD"}</button>
      </form>

      <div className="list">
        <ul>
          {todo.map((to) => {
            console.log(to);
            return (
              <li className="list-items">
                <div
                  className="list-item-list"
                  id={to.status ? "list-item" : ""}
                >
                  {to.list}
                </div>
                <span>
                  <IoMdDoneAll
                    className="list-item-icons"
                    id="complete"
                    title="complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <RiFileEditFill
                    className="list-item-icons"
                    id="edit"
                    title="edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <MdDeleteForever
                    className="list-item-icons"
                    id="delete"
                    title="delete"
                    onClick={() => onDelete(to.id)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
