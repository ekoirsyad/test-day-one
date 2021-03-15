import * as Types from "./action-types";
import { todosRef } from "../../firebase/firebase";

// export const addTodo = (todo) => ({
//   type: Types.ADD_TODO,
//   payload: { todo },
// });

export const fetchAll = () => async (dispatch) => {
  todosRef.on("value", (snapshot) => {
    const response = snapshot.val();

    if (response) {
      const normalizedResponse = Object.keys(response).map((e) => {
        return {
          ...response[e],
          date: new Date(response[e].date),
          firebaseKey: e,
        };
      });

      if (normalizedResponse.length > 0) {
        dispatch({
          type: Types.FETCH_TODOS,
          payload: normalizedResponse,
        });
      }
    }
  });
};

export const addTodo = (todo) => async (dispatch) => {
  const modifyDate = new Date(todo.date).getTime();
  todosRef.push().set({ ...todo, date: modifyDate }, (error) => {
    if (error) {
      console.log(error);
    } else {
      dispatch({
        type: Types.ADD_TODO,
        payload: { todo },
      });
    }
  });
};

export const deleteTodo = (todo) => async (dispatch) => {
  const id = todo.id;
  todosRef
    .child(todo.firebaseKey)
    .remove()
    .then(() => {
      dispatch({
        type: Types.DELETE_TODO,
        payload: { id },
      });
    });
};

export const toggleTodoStatus = (todo) => async (dispatch) => {
  console.log(todo);
  todosRef
    .child(todo.firebaseKey)
    .update({ done: !todo.done })
    .then(() => {
      dispatch({
        type: Types.TOGGLE_TODO_STATUS,
      });
    });
};

export const completeAll = (date) => ({
  type: Types.COMPLETE_ALL_TODOS,
  payload: { date },
});

export const deleteAll = (date) => ({
  type: Types.DELETE_ALL_TODOS,
  payload: { date },
});

export const updateStatusFilter = (status) => ({
  type: Types.UPDATE_TODO_STATUS_FILTER,
  payload: { status },
});

export const updateDateFilter = ({ key, value }) => ({
  type: Types.UPDATE_TODO_DATE_FILTER,
  payload: {
    key,
    value,
  },
});
