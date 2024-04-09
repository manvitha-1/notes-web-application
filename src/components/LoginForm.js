import React, { useState, useEffect } from "react";

const LoginForm = ({ handleLogout, userEmail }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const notesPerPage = 3;
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;

  const filteredNotes = notes.filter(note => {
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           note.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        const response = await fetch(
          `http://localhost:5000/api/notes/${editingNoteId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: title,
              description: description,
              userEmail: userEmail,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update note");
        }
      } else {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            description: description,
            userEmail: userEmail,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to store note");
        }
      }
      setTitle("");
      setDescription("");
      setEditingNoteId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error storing/updating note:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes?userEmail=${userEmail}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  
  const handleEdit = (noteId) => {
    const noteToEdit = notes.find((note) => note._id === noteId);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setEditingNoteId(noteId);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      await fetchNotes();
      if (currentNotes.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="exampleInputDescription"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-dark mr-2">
              {editingNoteId ? "Update" : "Submit"}
            </button>
            <br/><br/>
            <button className="btn btn-dark" onClick={handleLogout}>
              Logout
            </button>
            <div className="mb-3 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Title or Description ... "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-md-8">
          {currentNotes.map((note, index) => (
            <div className="card mb-2" key={index}>
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className="btn-group">
                  <a href="#" className="btn btn-warning mr-2" onClick={() => handleEdit(note._id)}>
                    Update
                  </a>
                  <button className="btn btn-danger" onClick={() => handleDelete(note._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          <br/>
          {filteredNotes.length > notesPerPage && (
            <ul className="pagination justify-content-end">
              {[...Array(Math.ceil(filteredNotes.length / notesPerPage)).keys()].map((pageNumber) => (
                <li
                  className={`page-item ${pageNumber + 1 === currentPage ? "active" : ""}`}
                  key={pageNumber}
                >
                  <button
                    className="page-link btn btn-dark"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

