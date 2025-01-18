import{r,I as w,z as y,q as e}from"./index-42b85287.js";const v=()=>{const[o,m]=r.useState(""),[i,g]=r.useState(""),[d,a]=r.useState(null),[l,c]=r.useState(!1),{login:h,currentUser:u,isAdmin:x,logout:p}=w(),n=y(),b=async s=>{s.preventDefault(),a(null),c(!0);try{await h(o,i),n("/admin-dashboard")}catch(t){t.code==="auth/invalid-email"?a("Invalid email address"):t.code==="auth/user-not-found"?a("User not found"):t.code==="auth/wrong-password"?a("Incorrect password"):a(t.message||"Login failed. Please try again.")}finally{c(!1)}},f=async()=>{try{await p(),n("/")}catch(s){console.error("Logout failed",s),a("Logout failed. Please try again.")}};return u&&x?e.jsx("div",{className:"min-h-screen bg-black flex flex-col justify-center items-center text-white",children:e.jsxs("div",{className:"bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6 text-center",children:"Admin Session Active"}),e.jsx("div",{className:"text-center mb-6",children:e.jsxs("p",{children:["Logged in as: ",u.email]})}),e.jsxs("div",{className:"flex flex-col space-y-4",children:[e.jsx("button",{onClick:()=>n("/admin-dashboard"),className:"bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300",children:"Go to Admin Dashboard"}),e.jsx("button",{onClick:f,className:"bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300",children:"Logout"})]})]})}):e.jsx("div",{className:"min-h-screen bg-black flex flex-col justify-center items-center text-white",children:e.jsxs("div",{className:"bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6 text-center",children:"Admin Login"}),d&&e.jsx("div",{className:"bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-4",children:d}),e.jsxs("form",{onSubmit:b,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2",children:"Email"}),e.jsx("input",{type:"email",id:"email",value:o,onChange:s=>m(s.target.value),required:!0,className:"w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500",placeholder:"Enter your email"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2",children:"Password"}),e.jsx("input",{type:"password",id:"password",value:i,onChange:s=>g(s.target.value),required:!0,className:"w-full bg-gray-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500",placeholder:"Enter your password"})]}),e.jsx("button",{type:"submit",disabled:l,className:`
              w-full py-2 rounded transition duration-300
              ${l?"bg-gray-600 cursor-not-allowed":"bg-purple-600 hover:bg-purple-700"}
              text-white font-bold
            `,children:l?"Logging in...":"Login"})]})]})})};export{v as default};
