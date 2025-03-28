import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const FormValidation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validateName = (name) => ({
    length: name.length >= 3,
    onlyLetters: /^[A-Za-z\s]+$/.test(name),
  });

  const validateEmail = (email) => ({
    validFormat: /\S+@\S+\.\S+/.test(email),
  });

  const validatePassword = (password) => ({
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  });

  const handleValidation = () => {
    let newErrors = {};
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    if (!nameValidation.length) newErrors.name = "Name must be at least 3 characters.";

    if (!emailValidation.validFormat) newErrors.email = "Enter a valid email format.";

    if (!passwordValidation.length) newErrors.password = "Password must be at least 6 characters.";
    if (!passwordValidation.uppercase) newErrors.password = "Include at least one uppercase letter.";
    if (!passwordValidation.lowercase) newErrors.password = "Include at least one lowercase letter.";
    if (!passwordValidation.number) newErrors.password = "Include at least one number.";
    if (!passwordValidation.specialChar) newErrors.password = "Include at least one special character (!@#$%^&*).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      alert("Form Validation successfully!");
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">Form Validation</h2>

        {/* Name Input */}
        <div className="mt-4">
          <label className="block text-gray-600">Name</label>
          <div className="flex items-center border rounded p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your name"
              className="w-full outline-none"
            />
          </div>
          {focusedField === "name" && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                {validateName(formData.name).length ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                At least 3 characters
              </p>
            </div>
          )}
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div className="mt-4">
          <label className="block text-gray-600">Email</label>
          <div className="flex items-center border rounded p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your email"
              className="w-full outline-none"
            />
          </div>
          {focusedField === "email" && (
            <div className="mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                {validateEmail(formData.email).validFormat ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                Must be a valid email (e.g. name@example.com)
              </p>
            </div>
          )}
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="block text-gray-600">Password</label>
          <div className="flex items-center border rounded p-2 relative">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your password"
              className="w-full outline-none"
            />
            <span className="absolute right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
          {focusedField === "password" && (
            <div className="mt-2 text-sm text-gray-600">
              {Object.entries(validatePassword(formData.password)).map(([key, value]) => (
                <p key={key} className="flex items-center gap-2">
                  {value ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                  {key === "length" && "At least 6 characters"}
                  {key === "uppercase" && "One uppercase letter"}
                  {key === "lowercase" && "One lowercase letter"}
                  {key === "number" && "One number"}
                  {key === "specialChar" && "One special character (!@#$%^&*)"}
                </p>
              ))}
            </div>
          )}
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormValidation;
