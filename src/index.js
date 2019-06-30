import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class App extends React.Component {
  render() {
    return (
      <article className="wrapper noselect">
        <section className="main-boxcontrol">
          <header className="header-menu">
            <div className="shan-li-image">
              <div className="shan-li-face"></div>
            </div>
            <article className="x-menu">
              <div className="x">
                <div className="x-2"></div>
              </div>
              <p className="x-p">選單</p>
            </article>
            <section className="x-menu-pop-out">
              <div className="about">
                <p>關於</p>
                <div className="line2"></div>
              </div>
              <div className="fb-fans">
                <p>粉絲專頁</p>
                <div className="line3"></div>
              </div>
              <div className="ig">
                <p>Instagram</p>
                <div className="line4"></div>
              </div>
              <div className="contact">
                <p>聯絡資訊</p>
                <div className="line5"></div>
              </div>
            </section>
            <section className="menu-boxcontrol-header">
              <ul className="select-menu">
                <li className="select-about">關於</li>
                <li className="select-fb-fans">粉絲專頁</li>
                <li className="select-ig">Instagram</li>
                <li className="select-contact">聯絡資訊</li>
              </ul>
            </section>
          </header>
          <section className="awake-first-section clearfix">
            <div className="shan-btn" id="shan-btn">
              <div className="swipe-scroll">---SWIPE TO VIEW---</div>
              <div className="hand-swipe"></div>
              <div className="landing-page">
                <p>WELCOME TO</p>
                <h3>YU-SHAN-LI</h3>
              </div>
              <div className="local-wrapper">
                <h2>LOCAL TAPAS</h2>
                <p></p>
                <ul className="plates">
                  <li>Loading Tapas....</li>
                </ul>

                <form className="add-items">
                  <input
                    type="text"
                    name="item"
                    placeholder="Item Name"
                    required
                  />
                  <input type="submit" value="+ Add Item" />
                </form>
              </div>
              <canvas id="rain"></canvas>

              <canvas id="renderCanvas"></canvas>
              <div className="scene">
                <div className="book-wrap">
                  <div className="left-side">
                    <div className="book-cover-left"></div>
                    <div className="layer1">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer2">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer3">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer4">
                      <div className="page-left"></div>
                    </div>
                    <div className="layer-text">
                      <div className="page-left-2">
                        <div className="page-left-2-before"></div>

                        <div className="page-text w-richtext">
                          <p>
                            <strong>Shan-Li</strong>
                          </p>
                        </div>
                        <div className="photo1"></div>
                        <div className="photo2"></div>
                        <div className="photo3"></div>
                        <div className="photo4"></div>
                        <div className="photo5"></div>
                        <div className="photo6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="center"></div>
                  <div className="right-side">
                    <div className="book-cover-right"></div>
                    <div className="layer1">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer2 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer3 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer4 right">
                      <div className="page-right"></div>
                    </div>
                    <div className="layer-text right">
                      <div className="page-right-2">
                        <div className="page-text w-richtext margin-10vw">
                          <p>Again</p>
                          <p>Again</p>
                          <p>Again</p>
                          <p>This couldn't happened again</p>
                          <p>this is once in a life time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br style={{ clear: 'both' }} />
              <article className="photo-album">
                <div className="photo1-show">
                  <span className="close"></span>
                  <img className="yushan1" />
                </div>
                <div className="photo2-show">
                  <span className="close"></span>
                  <img className="yushan2" />
                </div>
                <div className="photo3-show">
                  <span className="close"></span>
                  <img className="yushan3" />
                </div>
                <div className="photo4-show">
                  <span className="close"></span>
                  <img className="yushan4" />
                </div>
                <div className="photo5-show">
                  <span className="close"></span>
                  <img className="yushan5" />
                </div>
                <div className="photo6-show">
                  <span className="close"></span>
                  <img className="yushan6" />
                </div>
              </article>
              <aside className="aside-boxcontrol">
                <div className="aside-box">
                  <div className="page-line">
                    <div className="page-1"></div>
                    <div className="page-2"></div>
                    <div className="page-3"></div>
                    <div className="page-4"></div>
                    <div className="page-5"></div>
                  </div>
                </div>
              </aside>
              <footer className="footer-boxcontrol">
                <div id="footer-content"></div>
              </footer>
            </div>
          </section>
        </section>
      </article>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#app'));
