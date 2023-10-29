import { useState, useEffect } from "react";
import "./App.css";
import { Formik } from "formik";

function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('')
  const [edit,setEdit] = useState(true)

  // Replace 'fetchData' with your API call function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_APP_API}/get-contacts?page=${page}`
      );
      const response = await res.json();
      setContacts([ ...response.result]);
      setLoading(false)
    };
    fetchData()
  }, [keyword, page]);
  const updateContact = async (values) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API}/update-contact`, {
      method: "PUT", // Specify the HTTP method as PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await res.json()
    if (response.success === true && typeof window !== "undefined") {
      window.location.reload();
    }
  }
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  const handleSearch = (e) => {
    e.preventDefault()
    filterDataByKeyword(contacts,keyword)
  }
  function filterDataByKeyword(data, keyword) {
    const filteredData = data.filter((item) => {
      const email = item["emailAddress"];
      const firstName = item["firstName"];
      const displayName = item["displayName"];
      const homePhone = item["homePhone"];

      // Match the keyword against the relevant fields while ignoring case
      const keywordLower = keyword.toLowerCase();
      return (
        email.toLowerCase().includes(keywordLower) ||
        firstName.toLowerCase().includes(keywordLower) ||
        displayName.toLowerCase().includes(keywordLower) ||
        homePhone.toLowerCase().includes(keywordLower)
      );
    });
    setContacts(filteredData)
  }

  return (
    <div className="contact-app">
      <div className="contact-list">
        <h2>Contact List</h2>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            className="form-control form-control-sm mb-2"
            value={keyword}
            placeholder="Search Contact"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </form>
        <ul>
          {contacts?.map((contact, index) => (
            <div
              key={index}
              onClick={() => handleContactClick(contact)}
              className={`contact-list-item ${
                selectedContact === contact ? "selected" : ""
              }`}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                style={{ width: "50px" }}
                alt="Avatar"
              />
              {contact["displayName"]}
            </div>
          ))}
          {loading ? (
            <p>loading...</p>
          ) : (
              <button onClick={() => {
                setKeyword("")
                setPage(page + 1)
              }}>Load More</button>
          )}
        </ul>
      </div>

      <div className="contact-details">
        <h2>Contact Details</h2>
        {selectedContact ? (
          <div className="">
            {/* <div>
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle mb-2"
                style={{ width: "150px" }}
                alt="Avatar"
              />
              <p>Name: {selectedContact["displayName"]}</p>
              <p>Email: {selectedContact["emailAddress"]}</p>
              <p>Phone: {selectedContact["homePhone"]}</p>
              <p>notes: {selectedContact["notes"]}</p>
            </div>
            <div className="mt-5">
              <button>Save</button>
            </div> */}
            <div>
              <Formik
                initialValues={{ ...selectedContact }}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  updateContact(values);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle mb-3"
                        style={{ width: "150px" }}
                        alt="Avatar"
                      />
                      <div className="row">
                        <div className="col-6">
                          <label>Name</label>
                          <input
                            type="text"
                            name="displayName"
                            disabled={edit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values["displayName"]}
                            className="form-control form-control-sm mb-2"
                          />
                        </div>
                        <div className="col-6">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="homePhone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={edit}
                            value={values["homePhone"]}
                            className="form-control form-control-sm mb-2"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label>Email</label>
                          <input
                            type="email"
                            name="emailAddress"
                            disabled={edit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values["emailAddress"]}
                            className="form-control form-control-sm mb-2"
                          />
                        </div>
                        <div className="col-6">
                          <label>notes</label>
                          <input
                            type="text"
                            name="notes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={edit}
                            value={values["notes"]}
                            className="form-control form-control-sm mb-2"
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-6 ">
                          <button
                            type="button"
                            className="btn btn-light "
                            onClick={() => setEdit(!edit)}
                          >
                            {edit ? "Edit" : "Cancel"}
                          </button>
                        </div>
                        <div className="col-6 ">
                          <button
                            type="submit"
                            className="btn btn-dark "
                            disabled={edit || isSubmitting}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
              </Formik>
            </div>
          </div>
        ) : (
          <p>Select a contact to view details.</p>
        )}
      </div>
    </div>
  );
}

export default App;
