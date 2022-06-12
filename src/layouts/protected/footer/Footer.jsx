function Footer() {
  return (
    <div className="flex justify-center py-4 border-t border-blue-800 text-blue-800">
      <span className="px-3">
        &copy; zeeven {new Date().getFullYear()}
      </span>
    </div>
  )
}

export default Footer