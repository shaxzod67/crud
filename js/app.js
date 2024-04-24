const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

//tekshirish yani localstorechdan kelayotgan malumotlarni

let check = JSON.parse(localStorage.getItem('malum')) ? JSON.parse(localStorage.getItem('malum')) : [];
// bu tapada localstorechda mavjud bolsa chiqar bulmasa bosh array qaytar deb yozilgan



if (check.length) chiqarish();




// localstorejga malumotni jonatish
function jonatishlocalstrch() {
    localStorage.setItem('malum', JSON.stringify(check));
}



function vaqtSana() {
    const hozir = new Date();
    const kun = hozir.getDate() < 10 ? '0' + hozir.getDate() : hozir.getDate()
    const oy = hozir.getMonth() < 10 ? '0' + (hozir.getMonth() + 1) : hozir.getMonth()
    const yil = hozir.getFullYear()
    const min = hozir.getMinutes() < 10 ? '0' + hozir.getMinutes() : hozir.getMinutes()
    const soat = hozir.getHours() < 10 ? '0' + hozir.getHours() : hozir.getHours()
    const second = hozir.getSeconds() < 10 ? '0' + hozir.getSeconds() : hozir.getSeconds()

    fullDay.innerHTML = `${kun}.${oy}.${yil}`;
    hourEl.innerHTML = soat;
    minuteEl.innerHTML = min;
    secondEl.innerHTML = second;



    return (`${soat}:${min}:${second} , ${kun}.${oy}.${yil}`);


}


setInterval(vaqtSana, 1000);

function chiqarish() {
    const check = JSON.parse(localStorage.getItem('malum'));
    listGroupTodo.innerHTML = ""
    check.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
     ${item.ism}
        <div class="todo-icons">
            <span class="opacity-50 me-2">${item.vaqt}</span>
            <img src="./img/edit.svg" alt="rasm" width="25" height="25">
                <img onclick="deletemall(${i})" src="./img/delete.svg" alt="rasm" width="25" height="25">
                </div>
            </li> 
        `
    });

}





function xatolik(qaysi, xabar) {
    document.getElementById(`${qaysi}`).innerHTML = xabar;

    setTimeout(() => {
        document.getElementById(`${qaysi}`).innerHTML = '';
    }, 2000)
}
formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    let text = formCreate['input-create'].value.trim()

    if (text.length) {
        formCreate.reset()
        check.push({ ism: text, vaqt: vaqtSana(), bos: false })
        jonatishlocalstrch();
        chiqarish();
        console.log(text);
    }
    else {
        xatolik('message-create', 'Malumot kiriting')
    }
});


// delete

function deletemall(id) {
    const ochirish = check.filter((item, i) => {
        return i !== id;
    });
    check = ochirish;
    jonatishlocalstrch();
    chiqarish();
}

