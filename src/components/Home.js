import React, { useState } from 'react';
import { Modal } from 'bootstrap';


const Home = ({ setUser }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        plan: ''
    });

    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.plan) {
            setAlertMessage({ type: 'danger', text: 'Please fill out all fields!' });
            return;
        }


        setUser({
            name: formData.name,
            plan: formData.plan,
            phone: formData.phone
        });


        const modalElement = document.getElementById('successModal');
        const successModal = new Modal(modalElement);
        successModal.show();

        setAlertMessage(null);
    };

    return (
        <div>
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type} alert-dismissible fade show fixed-top w-75 mx-auto mt-3 shadow-lg`} style={{ zIndex: 2000 }}>
                    {alertMessage.text}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
                </div>
            )}

            <div id="homeCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="5"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://assets.architecturaldigest.in/photos/6008467bb3d78db39997d8f6/master/w_1600%2Cc_limit/Indian-chefs-Farzi-Cafe_Poppadum.jpg" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="Tiffin" />
                        <div className="carousel-caption d-none bg-dark bg-opacity-50 d-md-block p-3 rounded">
                            <h2>Delicious Homemade Tiffins</h2>
                            <p>Fresh, healthy and delivered to your doorstep.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="Healthy" />
                        <div className="carousel-caption d-none bg-dark bg-opacity-50 d-md-block p-3 rounded">
                            <h2>Healthy Choices</h2>
                            <p>Pick from our vegetarian and vegan options.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="Tiffin Box" />
                        <div className="carousel-caption d-none bg-dark bg-opacity-50 d-md-block p-3 rounded">
                            <h2>Freshly Packed Tiffins</h2>
                            <p>Perfect for your busy morning schedule.</p> 
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" className="d-block w-100" style={{ height: "80vh", objectFit: "cover" }} alt="Healthy Food" />
                        <div className="carousel-caption d-none bg-dark bg-opacity-50 d-md-block p-3 rounded">
                            <h2>Balanced Meals</h2>
                            <p>Nutritious and tasty options for everyone.</p>
                        </div>
                    </div>
                     <div className="carousel-item">
                        <div className="user-count-slide d-flex justify-content-center align-items-center">
                            <div className="user-count-overlay"></div>
                            <div className="user-count-content text-center">
                                <h1 className="user-count-title">500+ Happy Users</h1>
                                <p className="user-count-subtitle">Growing every day — trusted across the city!</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="offers-slide d-flex justify-content-center align-items-center">
                            <div className="offers-overlay"></div>
                            <div className="offers-content text-center">
                                <h1 className="offers-title">Special Offers Just for You!</h1>
                                <p className="offers-subtitle">
                                    Get <strong>10% OFF</strong> on monthly subscriptions • Free delivery for first-time users • Combo meals at discounted prices
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

           <section className="py-5 bg-light" id="register">
    <div className="container">
        <h2 className="text-center mb-4 fw-bold">Join UrbanBite</h2>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow border-0 p-4">
                    <form onSubmit={handleSubmit} className="row g-3">

                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                placeholder="Full Name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="col-md-6">
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="phone" 
                                placeholder="Phone Number" 
                                value={formData.phone} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="col-md-6">
                            <select 
                                className="form-select" 
                                name="plan" 
                                value={formData.plan} 
                                onChange={handleChange}
                            >
                                <option value="">Select Plan</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>

                        {/* Veg / Non-Veg Option */}
                        <div className="col-md-6">
                            <select 
                                className="form-select" 
                                name="foodType" 
                                value={formData.foodType} 
                                onChange={handleChange}
                            >
                                <option value="">Food Preference</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>

                        <div className="col-12 text-center mt-4">
                            <button type="submit" className="btn btn-success px-5 btn-lg">
                                Register Now
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</section>


            <div className="modal fade" id="successModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-success">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Welcome Aboard! 🎉</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center py-4">

                            <h4>Thank you, {formData.name || 'Foodie'}!</h4>
                            <p className="text-muted">You have selected the <strong>{formData.plan}</strong> plan.</p>
                            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Okay, got it!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;