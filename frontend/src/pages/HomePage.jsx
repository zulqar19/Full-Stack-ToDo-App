import TodoApp from "../component/TodoApp"

const HomePage = () => {
  return (
    <>
    <div className="container w-[100vw] h-[calc(100vh-64.8px)] m-auto flex flex-col justify-center items-center bg-gradient-to-r from-[#42d2a4] to-[#185a9d]">
        <TodoApp />
    </div>
    </>
  )
}

export default HomePage