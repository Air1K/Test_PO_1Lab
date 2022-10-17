function main (a, b){
    let x = 1;
    console.log(a, b);
    if(a===0 || b===0){
        return alert("X != 0")
    }
    else{
        if(a > b || a===b){
            console.log(a, b);
            return alert("Введите в a левую границу, в b правую")
        }
    }

    let length_mass = (b-a) / x;
    console.log(length_mass)
    let F =[];
    let mass_X =[];
    let tr_fa = true;
        // = (Math.pow(x,2) - 0.25)/x;
    while (tr_fa){
        for(let i = a, l=0; i<b+x; l++, i += x){
            if((i+(x/2)) === 0){
                return alert("x = 0")
            }
            if((Math.pow((i+(x/2)),2) - 0.25) < 0){
                return alert("Под корнем меньше 0")
            }
                F.push(Math.sqrt(Math.pow((i+(x/2)),2) - 0.25)/(i+(x/2)));
                mass_X.push(i+(x/2));
        }
        if(F[1]-F[0] < 0.01 && F[1] !== 0 && F[0] !== 0){
            tr_fa = false;
        }else {
            F = [];
            mass_X = [];
            x = x/2;
        }
    }

    let sum = 0;
    for (let i = 0; i < F.length; i++) { sum += F[i]*x;}



    try {
        let el = document.getElementById('tbody');
        el.remove()
        let el_canvas = document.getElementById('myChart');
        el_canvas.remove()
        // $('#tblParticipantList > tr').eq(rowNum).children('td').remove();
    }catch (e){
        console.log(e);
    }

    const el_t = document.createElement('tbody');
    el_t.setAttribute('id', 'tbody');
    const box = document.getElementById('table_1');
    box.appendChild(el_t);

    const el_t_canvas = document.createElement('canvas');
    el_t_canvas.setAttribute('id', 'myChart');
    const box_canvas = document.getElementById('content');
    box_canvas.appendChild(el_t_canvas);


    const table = document.querySelector('tbody');
    let row = document.createElement('tr');
    row.id = 'ids';
    row.innerHTML = `<td>${mass_X[0]}</td><td>${F[0]}</td><td>${F[0]*x}</td><td>${sum}</td>`;
    table.appendChild(row);
    for (let i = 1; i < F.length; i++) {
        let row = document.createElement('tr');
        row.id = 'ids';
        row.innerHTML = `<td>${mass_X[i]}</td><td>${F[i]}</td><td>${F[i]*x}</td>`;
        table.appendChild(row);
    }

    Diagram (mass_X);
}

function Diagram (mass_X) {
    let ctx = document.getElementById("myChart");
    let myChart = new Chart (ctx, {
        type: 'line',
        data: {
            labels: [], //Подписи оси x
            datasets: [
                {
                    label: 'f(x)', //Метка
                    data: [], //Данные
                    borderColor: 'blue', //Цвет
                    borderWidth: 2, //Толщина линии
                    fill: false //Не заполнять под графиком
                }
                //Можно добавить другие графики
            ]
        },
        options: {
            responsive: false, //Вписывать в размер canvas
            scales: {
                xAxes: [{
                    display: true
                }],
                yAxes: [{
                    display: true
                }]
            }
        }
    });
    //Заполняем данными
    for (let x = 1; x<mass_X.length; x++) {
        myChart.data.labels.push(''+mass_X[x].toFixed(2));
        myChart.data.datasets[0].data.push(f(mass_X[x]).toFixed(2));
    }
    //Обновляем
    myChart.update();

    function f(x) { //Вычисление нужной функции
        return (Math.pow(x,2) - 0.25)/(x);
    }
}

//Ставим загрузку диаграммы на событие загрузки страницы
window.addEventListener("load", Diagram);