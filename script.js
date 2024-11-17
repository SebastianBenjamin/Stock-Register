  // Importing Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

  // Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyCSzOTzi-g4iuARDzju2XCHPWxDiDGgNgo",
      authDomain: "stock-register-57e7d.firebaseapp.com",
      databaseURL: "https://stock-register-57e7d-default-rtdb.firebaseio.com",
      projectId: "stock-register-57e7d",
      storageBucket: "stock-register-57e7d.firebasestorage.app",
      messagingSenderId: "394246902834",
      appId: "1:394246902834:web:874ffdcf1496df1896d82b",
      measurementId: "G-9E6BT88LCD"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Loading pages (In-house, Out-house, Damaged, Status)
  export function loadInpage() {
    document.getElementById('overview-header').innerHTML =`
    <h2>STOCK IN </h2>
    `;
      document.getElementById('content-parent').innerHTML = `
          <div class="content-subdiv-flex-column">
              <input type="text" name="in-text" id="in-txt" placeholder="Enter code" class="content-input" >
              <button class="content-box-btn" id="in-btn">Stock In</button>
          </div>
      `;
      document.getElementById('in-txt').focus();
      document.getElementById('in-btn').addEventListener('click', () => stockIn(document.getElementById('in-txt').value));
  }

  export function loadOutpage() {
    document.getElementById('overview-header').innerHTML =`
    <h2>STOCK OUT </h2>
    `;
      document.getElementById('content-parent').innerHTML = `
          <div class="content-subdiv-flex-column">
              <input type="text" name="out-text" id="out-txt" placeholder="Enter code" class="content-input">
              <button class="content-box-btn" id="out-btn">Stock Out</button>
          </div>
      `;
      document.getElementById('out-txt').focus();
      document.getElementById('out-btn').addEventListener('click', () => stockOut(document.getElementById('out-txt').value));
  }

  export function loadDmgpage() {
    document.getElementById('overview-header').innerHTML =`
    <h2>STOCK DAMAGE </h2>
    `;
      document.getElementById('content-parent').innerHTML = `
          <div class="content-subdiv-flex-column">
              <input type="text" name="dmg-text" id="dmg-txt" placeholder="Enter code" class="content-input">
              <button class="content-box-btn" id="dmg-btn">Stock Damaged</button>
          </div>
      `;
      document.getElementById('dmg-txt').focus();
      document.getElementById('dmg-btn').addEventListener('click', () => stockDmg(document.getElementById('dmg-txt').value));
  }

  export function loadOvpage() {
      
      document.getElementById('overview-header').innerHTML =`
      <h2>STOCK OVERVIEW</h2>
<div >
    <input type="text" class="content-input" id="ovr-txt" placeholder="Search Id" onkeyup='searchData(this.value)'>
<button class="content-box-btn" id="sts-btn" >SEARCH</button>
</div>

      `;

      document.getElementById('content-parent').innerHTML = `
          <div class="content-subdiv-flex-column" >
              <div id="show-sts"></div>
           
          </div>
      `;
      document.getElementById('ovr-txt').focus();
      getData();
           
  }

  export function stockIn(value) {
      const dataRef = ref(db, 'Stock/' + value); 
      set(dataRef, {
          name: value,
          quantity: 1,
          status: "In stock"
      }).then(() => {
          console.log('Data uploaded successfully');
          clearInput(document.getElementById('in-txt'));
          document.getElementById('pop').innerHTML='<h1>Data Updated</h1><h2>Status : Stock In</h2>';
          document.getElementById('pop').style.display='flex';
          
          setTimeout(() => {
              document.getElementById('pop').style.display='none';
              document.getElementById('in-txt').focus();
            }, 1500);
      }).catch((error) => {
          console.error('Error uploading data: ', error);
      });
  }

  export function stockOut(value) {
      const dataRef = ref(db, 'Stock/' + value); 
      set(dataRef, {
          name: value,
          quantity: 1,
          status: "Out of Stock"
      }).then(() => {
          console.log('Data uploaded successfully');
          clearInput(document.getElementById('out-txt'));
          document.getElementById('pop').innerHTML='<h1>Data Updated</h1><h2>Status : Out of Stock</h2>';
          document.getElementById('pop').style.display='flex';
          
          setTimeout(() => {
              document.getElementById('pop').style.display='none';
              document.getElementById('out-txt').focus();
            }, 1500);
      }).catch((error) => {
          console.error('Error uploading data: ', error);
      });
  }

  export function stockDmg(value) {
      const dataRef = ref(db, 'Stock/' + value); 
      set(dataRef, {
          name: value,
          quantity: 1,
          status: "Damage"
      }).then(() => {
          console.log('Data uploaded successfully');
          clearInput(document.getElementById('dmg-txt'));
          document.getElementById('pop').innerHTML='<h1>Data Updated</h1><h2>Status : Stock Damage</h2>';
          document.getElementById('pop').style.display='flex';
          
          setTimeout(() => {
              document.getElementById('pop').style.display='none';
              document.getElementById('dmg-txt').focus();
            }, 1500);

      }).catch((error) => {
          console.error('Error uploading data: ', error);
      });
  }

  // Fetch and display stock data
  export function getData() {
      const Data = ref(db, 'Stock');  
      get(Data).then((snapshot) => {
          if (snapshot.exists()) {
              const stockData = snapshot.val();
             var tabContent=`
              <table>
          <thead>
              <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Status</th>
              </tr>
              </thead>
                  <tbody>
              `;
              for (const node in stockData) {
                  const item = stockData[node];
                  tabContent += `
                      <tr>
                      <td>${item.name}</td>
                      <td> ${item.quantity}</td> 
                      <td> ${item.status}</td>
                      </tr>`;
              }
              tabContent += `</tbody></table>`;
              document.getElementById('show-sts').innerHTML =tabContent;
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error('Error fetching data: ', error);
      });
  }

  // Clear input field
  export function clearInput(element){
      element.value='';
      console.log(element);
  }

  
  export function searchData(value) {
    const rows = document.getElementsByTagName('tr');
    Array.from(rows).forEach(row => { 
        if (row.textContent.includes(value)&&value.trim()!='') { 
           row.classList.add('table-highlight');
        }
        else{
            row.classList.remove('table-highlight');
        }
    });
}


  $(document).ready(() => {
    
      $('ul>li').click(function () {
          $(this).siblings().removeClass('li');
          $(this).addClass('li');
      });
      $('ul>li:eq(3)').click();
  });

  // Make functions accessible globally
  window.loadInpage = loadInpage;
  window.loadOutpage = loadOutpage;
  window.loadDmgpage = loadDmgpage;
  window.loadOvpage = loadOvpage;
  window.searchData = searchData;