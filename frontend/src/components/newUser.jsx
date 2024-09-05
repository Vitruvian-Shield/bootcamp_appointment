import { useState } from 'react';
import './newUser.css';

function NewUser() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        birth_data: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        {errors.first_name && <p className="error">{Array.isArray(errors.first_name) ? errors.first_name.join(', ') : errors.first_name}</p>}
        {errors.last_name && <p className="error">{Array.isArray(errors.last_name) ? errors.last_name.join(', ') : errors.last_name}</p>}
        {errors.username && <p className="error">{Array.isArray(errors.username) ? errors.username.join(', ') : errors.username}</p>}
        {errors.email && <p className="error">{Array.isArray(errors.email) ? errors.email.join(', ') : errors.email}</p>}
        {errors.phone_number && <p className="error">{Array.isArray(errors.phone_number) ? errors.phone_number.join(', ') : errors.phone_number}</p>}
        {errors.birth_data && <p className="error">{Array.isArray(errors.birth_data) ? errors.birth_data.join(', ') : errors.birth_data}</p>}
        {errors.password && <p className="error">{Array.isArray(errors.password) ? errors.password.join(', ') : errors.password}</p>}


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8000/api/accounts/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('حساب کاربری با موفقیت ایجاد شد!');
                    setFormData({
                        first_name: '',
                        last_name: '',
                        username: '',
                        email: '',
                        phone_number: '',
                        birth_data: '',
                        password: ''
                    });
                } else {
                    if (data && typeof data === 'object') {
                        setErrors(data); 
                    } else {
                        setErrors({ general: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors({ general: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' });
            }
        }
    };

    return (
        <div id="newUser-container">
            <div className="form-wrapper">
                <h2>ایجاد حساب کاربری جدید</h2>
                <form onSubmit={handleSubmit} id='myform'>
                    {errors.general && <p className="error">{errors.general}</p>}
                    <div className="input-group">
                        <label htmlFor="first_name">نام</label>
                        <input
                            type="text"
                            id="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p className="error">{errors.first_name[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="last_name">نام خانوادگی</label>
                        <input
                            type="text"
                            id="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p className="error">{errors.last_name[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">نام کاربری</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error">{errors.username[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone_number">شماره موبایل</label>
                        <input
                            type="tel"
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                        {errors.phone_number && <p className="error">{errors.phone_number[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="birth_data">تاریخ تولد</label>
                        <input
                            type="date"
                            id="birth_data"
                            value={formData.birth_data}
                            onChange={handleChange}
                        />
                        {errors.birth_data && <p className="error">{errors.birth_data[0]}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">رمز عبور</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password[0]}</p>}
                    </div>
                    <button type="submit">ایجاد حساب</button>
                </form>
            </div>
        </div>
    );
}

export default NewUser;
