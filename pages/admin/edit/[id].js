import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function EditKat({ getKatID }) {
  const [namaKat, SetnamaKat] = useState(getKatID.data.attributes.nama);
  const [desKat, SetdesKat] = useState(getKatID.data.attributes.deskripsi);
  function editNama(e) {
    SetnamaKat(e.target.value);
  }
  function editDes(e) {
    SetdesKat(e.target.value);
  }
  const router = useRouter();
  async function updateData(e) {
    console.log(getKatID);
    e.preventDefault();
    const putData = await axios({
      url: `http://localhost:1337/api/kategoris/${getKatID.data.id}`,
      method: "PUT",
      data: {
        data: {
          nama: namaKat,
          deskripsi: desKat,
        },
      },
    });
    alert("Data Berhasil di Update");
    router.replace(`/admin`);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin">
            Admin BOEKOE
          </a>
        </div>
      </nav>
      <div className="container">
        <h1 className="fs-4 text-center">Edit Kategori</h1>
        <form
          className="p-2"
          onSubmit={function (e) {
            updateData(e);
          }}
        >
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="InpKategori"
                  placeholder="input Kategori"
                  onChange={function (e) {
                    editNama(e);
                  }}
                  value={namaKat}
                />
                <label htmlFor="floatingTextarea2">Input Kategori</label>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Deskripsi
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 90 }}
                  defaultValue={""}
                  onChange={function (e) {
                    editDes(e);
                  }}
                  value={desKat}
                />
                <label htmlFor="floatingTextarea2">Input Deskripsi</label>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary mt-3">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditKat;

export async function getServerSideProps(req, res) {
  const respon = await axios.get(
    `http://localhost:1337/api/kategoris/${req.query.id}`
  );
  const getKatID = respon.data;
  return {
    props: { getKatID }, // will be passed to the page component as props
  };
}
