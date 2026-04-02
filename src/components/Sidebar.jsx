import { Link, useLocation, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import axios from "axios"
import { useEffect, useState } from "react"
import "../style/Sidebar.css"

const Sidebar = ({ role }) => {
  const location = useLocation()
  const navigate  = useNavigate()
  const cookies   = new Cookies()
  const token     = localStorage.getItem("token")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setUser(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (token) fetchUser()
  }, [token])

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      console.log(error)
    } finally {
      cookies.remove("token", { path: "/" })
      localStorage.removeItem("token")
      navigate("/login")
    }
  }

  const isActive = (path) => {
    if (location.pathname === path) return "active"
    return ""
  }

  const getRoleLabel = () => {
    if (role === "admin")  return "Admin Panel"
    if (role === "vendor") return "Vendor Portal"
    return "My Account"
  }

  const renderAdminLinks = () => {
    if (role !== "admin") return null
    return (
      <>
        <li className="sidebar-nav-label">Main</li>
        <li><Link to="/admin/dashboard" className={`sidebar-link ${isActive("/admin/dashboard")}`}><i className="bi bi-grid-1x2" /> Dashboard</Link></li>
        <li className="sidebar-nav-label">Management</li>
        <li><Link to="/admin/users"     className={`sidebar-link ${isActive("/admin/users")}`}><i className="bi bi-people" /> Users</Link></li>
        <li><Link to="/admin/vendors"   className={`sidebar-link ${isActive("/admin/vendors")}`}><i className="bi bi-shop" /> Vendors</Link></li>
        <li><Link to="/admin/products"  className={`sidebar-link ${isActive("/admin/products")}`}><i className="bi bi-box-seam" /> Products</Link></li>
        <li><Link to="/admin/orders"    className={`sidebar-link ${isActive("/admin/orders")}`}><i className="bi bi-receipt" /> Orders</Link></li>
        <li><Link to="/admin/kyc"       className={`sidebar-link ${isActive("/admin/kyc")}`}><i className="bi bi-shield-check" /> KYC Monitor</Link></li>
        <li className="sidebar-nav-label">Store</li>
        <li><Link to="/shop"            className={`sidebar-link ${isActive("/shop")}`}><i className="bi bi-storefront" /> Marketplace</Link></li>
      </>
    )
  }

  const renderVendorLinks = () => {
    if (role !== "vendor") return null
    return (
      <>
        <li className="sidebar-nav-label">Main</li>
        <li><Link to="/vendor/dashboard" className={`sidebar-link ${isActive("/vendor/dashboard")}`}><i className="bi bi-grid-1x2" /> Dashboard</Link></li>
        <li className="sidebar-nav-label">Store</li>
        <li><Link to="/vendor/products"  className={`sidebar-link ${isActive("/vendor/products")}`}><i className="bi bi-box-seam" /> My Products</Link></li>
        <li><Link to="/vendor/orders"    className={`sidebar-link ${isActive("/vendor/orders")}`}><i className="bi bi-receipt" /> Orders</Link></li>
        <li><Link to="/shop"             className={`sidebar-link ${isActive("/shop")}`}><i className="bi bi-storefront" /> Marketplace</Link></li>
      </>
    )
  }

  const renderUserLinks = () => {
    if (role !== "user") return null
    return (
      <>
        <li className="sidebar-nav-label">Shopping</li>
        <li><Link to="/shop"   className={`sidebar-link ${isActive("/shop")}`}><i className="bi bi-storefront" /> Shop</Link></li>
        <li><Link to="/cart"   className={`sidebar-link ${isActive("/cart")}`}><i className="bi bi-bag" /> My Cart</Link></li>
        <li><Link to="/orders" className={`sidebar-link ${isActive("/orders")}`}><i className="bi bi-receipt" /> My Orders</Link></li>
      </>
    )
  }

  const renderUserInfo = () => {
    if (!user) return null
    return (
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user.firstName?.[0]}{user.lastName?.[0]}
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="sidebar-user-name">{user.firstName} {user.lastName}</div>
          <div className="sidebar-user-role">{user.roles}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="sidebar">

      <div className="sidebar-brand">
        <div className="sidebar-brand-name">
          Nana's <span>Pourfection</span> Hub
        </div>
        <span className="sidebar-role-badge">{getRoleLabel()}</span>
      </div>

      <ul className="sidebar-nav">
        {renderAdminLinks()}
        {renderVendorLinks()}
        {renderUserLinks()}
        <div className="sidebar-divider" />
        <li><Link to="/me"         className={`sidebar-link ${isActive("/me")}`}><i className="bi bi-person-circle" /> Profile</Link></li>
        <li><Link to="/categories" className={`sidebar-link ${isActive("/categories")}`}><i className="bi bi-grid" /> Categories</Link></li>
      </ul>

      <div className="sidebar-footer">
        {renderUserInfo()}
        <button onClick={handleLogout} className="sidebar-logout">
          <i className="bi bi-box-arrow-left" />
          Sign Out
        </button>
      </div>

    </div>
  )
}

export default Sidebar