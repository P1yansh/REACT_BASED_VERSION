import React, { useEffect, useState } from 'react';
import { Modal } from 'bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const slides = [
    {
        tag: 'Fresh Food, Daily',
        title: <>Fresh Food,<br />Daily.</>,
        text: 'No prep, no cleanup, just pure performance.',
        cta: 'View Menu',
        to: '/menu',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400&q=80',
        alt: 'Fresh bowl with grains and vegetables',
    },
    {
        tag: 'Hustle Fuel',
        title: <>Fuel Your<br />Hustle.</>,
        text: 'Chef-crafted, macro-balanced meals delivered hot to your door.',
        cta: 'Start Now',
        to: '#register',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=80',
        alt: 'Colorful salad bowls prepared for delivery',
    },
    {
        tag: 'Premium Tiffin',
        title: <>Premium<br />Tiffin Service.</>,
        text: '500+ active foodies trust UrbanBite.',
        cta: 'Join Now',
        to: '#register',
        image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=1400&q=80',
        alt: 'Healthy meal spread on a table',
    },
];

const Home = () => {
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', plan: '', foodType: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const goToSlide = (index) => {
        setCurrentSlide(((index % slides.length) + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentSlide((index) => (index + 1) % slides.length);
        }, 4500);

        return () => window.clearInterval(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.plan) {
            setAlertMessage({ type: 'danger', text: 'Please fill out all fields!' });
            return;
        }
        setLoading(true);
        try {
            await register(formData);
            const modalElement = document.getElementById('successModal');
            const successModal = new Modal(modalElement);
            successModal.show();
            setAlertMessage(null);
        } catch (err) {
            setAlertMessage({ type: 'danger', text: err.message || 'Registration failed. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-redesign">
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type} alert-dismissible fade show fixed-top w-75 mx-auto mt-3`} style={{ zIndex: 2000 }}>
                    {alertMessage.text}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage(null)}></button>
                </div>
            )}

            <section className="ub-hero" aria-label="UrbanBite featured meals">
                <div className="ub-slide-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <article className={`ub-slide ${index === currentSlide ? 'active' : ''}`} key={slide.tag}>
                            <img className="ub-slide-bg" src={slide.image} alt={slide.alt} />
                            <div className="ub-slide-content">
                                <div className="ub-slide-tag">{slide.tag}</div>
                                <h2 className="ub-slide-title">{slide.title}</h2>
                                <p className="ub-slide-text">{slide.text}</p>
                                {slide.to.startsWith('#') ? (
                                    <a className="ub-slide-cta" href={slide.to}>{slide.cta}</a>
                                ) : (
                                    <Link className="ub-slide-cta" to={slide.to}>{slide.cta}</Link>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                <button className="ub-hero-arrow ub-hero-arrow-prev" type="button" onClick={() => goToSlide(currentSlide - 1)} aria-label="Previous slide">
                    &#8249;
                </button>
                <button className="ub-hero-arrow ub-hero-arrow-next" type="button" onClick={() => goToSlide(currentSlide + 1)} aria-label="Next slide">
                    &#8250;
                </button>

                <div className="ub-hero-bar">
                    <div className="ub-hero-dots" aria-label="Choose hero slide">
                        {slides.map((slide, index) => (
                            <button
                                className={`ub-hero-dot ${index === currentSlide ? 'on' : ''}`}
                                type="button"
                                key={slide.tag}
                                onClick={() => goToSlide(index)}
                                aria-label={`Show slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="ub-hero-counter"><b>{String(currentSlide + 1).padStart(2, '0')}</b> / {String(slides.length).padStart(2, '0')}</div>
                </div>
            </section>

            <section id="register" className="ub-join-wrap">
                <div className="ub-join-copy">
                    <h2 className="ub-join-title">Join The<br />Club.</h2>
                    <p className="ub-join-text">Access exclusive weekly menus and track your nutrition.</p>
                    <ul className="ub-benefit-list" aria-label="Membership benefits">
                        <li><span></span>Exclusive weekly menus</li>
                        <li><span></span>Nutrition tracking dashboard</li>
                        <li><span></span>Priority delivery slots</li>
                    </ul>
                    <div className="ub-join-badge">
                        <div className="ub-join-number">500+</div>
                        <div className="ub-join-label">Active Foodies</div>
                    </div>
                </div>

                <div className="ub-join-form">
                    {isAuthenticated ? (
                        <div className="ub-auth-card text-center">
                            <h4>You're in!</h4>
                            <Link to="/dashboard" className="ub-slide-cta mt-3 d-inline-block">Go to Dashboard</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="ub-form-full">
                                <input type="text" className="ub-form-input" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="ub-form-row">
                                <input type="email" className="ub-form-input" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <input type="tel" className="ub-form-input" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="ub-form-full">
                                <input type="password" className="ub-form-input" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="ub-form-row">
                                <select className="ub-form-select" name="plan" value={formData.plan} onChange={handleChange}>
                                    <option value="">Select Plan</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                                <select className="ub-form-select" name="foodType" value={formData.foodType} onChange={handleChange}>
                                    <option value="">Food Preference</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                            <button type="submit" className="ub-form-button" disabled={loading}>
                                {loading ? 'Subscribing...' : 'Access Now'}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <div className="modal fade" id="successModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center p-5">
                            <h3>Welcome, {formData.name || 'Foodie'}!</h3>
                            <p className="text-muted">Your {formData.plan} plan is active.</p>
                            <button type="button" className="btn-neon w-100 mt-4" data-bs-dismiss="modal" onClick={() => navigate('/dashboard')}>
                                Enter Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
