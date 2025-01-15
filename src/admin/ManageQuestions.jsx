import { useDispatch, useSelector } from 'react-redux';  
import { useState, useEffect, Fragment } from 'react';
import React from 'react';
import { deleteQuestionById, fetchAllQuestions } from '../store/slice/questionSlice';  

function ManageQuestions() {
  const [questionsData, setQuestionsData] = useState([]);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const loading = useSelector((state) => state.questions.loading);

  useEffect(() => {
    dispatch(fetchAllQuestions())
      .then((response) => {

        setQuestionsData(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteQuestionById(id))
      .unwrap()
      .then(() => {
        setQuestionsData((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
        console.log("Question deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  return (
    <div className="add-question flex-col flex justify-content items-center my-9">
      <h2 className='text-3xl text-center'>Manage Questions</h2>
      {loading && <p className='text-blue-500 text-2xl '>Loading...</p>}
      {!loading && <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300 text-left">Question</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionsData && questionsData.length > 0 ? (
            questionsData.map((data, index) => (
              <Fragment key={index}>
                <tr className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300"><span className="font-bold">{index + 1}.</span> {data.question}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="">
                  <td colSpan={2} className="px-4 py-2 border border-gray-300">
                    <ul className="pl-6 list-none  flex gap-[2rem]">
                      {data.options.map((option, idx) => (
                        <li className='bg-blue-100 py-1 px-4 border border-blue-500 text-blue-500' key={idx}>{option}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className='bg-gray-100'>
                  <td colSpan={2} className="px-4 py-2 border border-gray-300 mx-auto block">
                    <strong>Answer:</strong> {data.answer}
                  </td>
                </tr>
              </Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-4 py-2 border border-gray-300 text-center">
                No questions available
              </td>
            </tr>
          )}
        </tbody>
      </table>}

    </div>
  );
}

export default ManageQuestions;