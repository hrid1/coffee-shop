import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const UpdateCofe = () => {
  const coffee = useLoaderData();
  //   console.log(coffee);

  const [formData, setFormData] = useState({
    name: coffee.name,
    quantity: coffee.quantity,
    supplier: coffee.supplier,
    taste: coffee.taste,
    category: coffee.category,
    details: coffee.details,
    photo: coffee.photo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    fetch(`http://localhost:4000/coffee-update/${coffee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) alert("Coffee Updated");
      });
  };

  return (
    <div className="bg-gray-100 p-10 rounded-lg shadow-lg w-10/12 lg:w-7/12 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        Update Your Coffee
      </h1>
      <p className="text-center text-gray-600 mb-6">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter coffee name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Enter coffee quantity"
            className="input input-bordered w-full"
            value={formData.quantity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="supplier"
            placeholder="Enter coffee supplier"
            className="input input-bordered w-full"
            value={formData.supplier}
            onChange={handleChange}
          />
          <input
            type="text"
            name="taste"
            placeholder="Enter coffee taste"
            className="input input-bordered w-full"
            value={formData.taste}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Enter coffee category"
            className="input input-bordered w-full"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="details"
            placeholder="Enter coffee details"
            className="input input-bordered w-full"
            value={formData.details}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="photo"
          placeholder="Enter photo URL"
          className="input input-bordered w-full"
          value={formData.photo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-block bg-teal-500 text-white border-none hover:bg-teal-600"
        >
          Add Coffee
        </button>
      </form>
    </div>
  );
};

export default UpdateCofe;
