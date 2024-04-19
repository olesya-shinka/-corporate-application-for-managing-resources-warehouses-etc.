import "./style.css";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-buttons">
        <button className="menu-button-checked">
          <img src="home-03.svg" alt="home" /> Склады
        </button>
        <button className="menu-button">
          <img src="arrows.svg" alt="arrows" />
          Транзакции
        </button>
      </div>
      <div className="menu-nav">
        <div className="menu-nav-items">
          <p>Межоперационные склады</p>
          <img src="chevron-down.svg" alt="arrow" />
        </div>
        <div className="menu-items">
          <div className="menu-item">
            <p>Склад продукции</p>
            <span>400</span>
          </div>
          <div className="menu-item">
            <p>Склад заготовок</p>
            <span>200</span>
          </div>
          <div className="menu-item">
            <p>Хозяйственный склад</p>
            <span>300</span>
          </div>
          <div className="menu-item">
            <p>Инструментальный склад</p>
            <span>500</span>
          </div>
          <div className="menu-item">
            <p>Склад мерителей</p>
            <span>700</span>
          </div>
          <div className="menu-item-checked">
            <p className="menu-name-item">Склад ЗИП</p>
            <span>214</span>
          </div>
        </div>
        <div className="menu-item">
          <p>Оборудование</p>
          <span>214</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
