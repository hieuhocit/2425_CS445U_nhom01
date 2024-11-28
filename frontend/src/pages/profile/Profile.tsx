import styles from "./Profile.module.scss";
import Header from "@/components/header/Header";
import { useSelector } from "react-redux";
import { themeMode } from "@/store/theme/themeSelector";
function ProfilePage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === "dark";

  return (
    <div className={`${styles.profile} ${isDarkMode ? styles.darkMode : ""}`}>
      <Header title="Thông tin cá nhân" isDark={isDarkMode} />
      <div className={styles["profile-container"]}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles["profile-avatar"]}>
            <div className={styles["avatar-icon"]}>👤</div>
            <h3>Trần Tiến Đạt</h3>
          </div>
          <ul className={styles.menu}>
            <li>Thông tin cá nhân</li>
            <li>Mật khẩu</li>
            <li>Đăng xuất</li>
          </ul>
        </div>

        {/* Main content */}
        <div className={styles["profile-content"]}>
          <h2></h2>
          <form className={styles["profile-form"]}>
            <div className={styles["form-group"]}>
              <label>Họ và tên</label>
              <input type="text" defaultValue="" />
            </div>
            <div className={styles["form-group"]}>
              <label>Email</label>
              <input type="email" defaultValue="" />
            </div>
            <div className={styles["form-group"]}>
              <label>Số điện thoại</label>
              <input type="text" defaultValue="" />
            </div>
            {/* <div className="form-group">
            <label>Ngày sinh</label>
            <input type="text" defaultValue="" />
          </div> */}
            <div className={styles["form-group"]}>
              <label>Ngày sinh</label>
              <input
                type="date"
                defaultValue="" // Giá trị mặc định
                onChange={(e) => console.log(e.target.value)} // Lấy ngày sinh khi người dùng chọn
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Giới tính</label>
              <div className={styles["gender-options"]}>
                <label>
                  Nam
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    defaultChecked
                  />
                </label>
                <label>
                  Nữ
                  <input type="radio" name="gender" value="Nữ" />
                </label>
              </div>
              <button>Cập nhật</button>
            </div>
           
          </form>
       
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
