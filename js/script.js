"use struct"
document.addEventListener('DOMContentLoaded', function(){
    //==================== Плавный скролл ====================//    
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
    
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    };
//==================== Анимация линий ====================//
    var svgEl = document.querySelector('.animated-lines');

    var randomRange = function(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
    };

    var numberOfLines = 30,
    lineDataArr = [];

    var createPathString = function() {

    var completedPath = '',
        comma = ',',
        ampl = 50; // pixel range from 0, aka how deeply they bend

    for (var i = 0; i < numberOfLines; i++) {

        var path = lineDataArr[i];

        var current = {
        x: ampl * Math.sin(path.counter / path.sin),
        y: ampl * Math.cos(path.counter / path.cos)
        };

        var newPathSection = 'M' +
        // starting point
        path.startX +
        comma +
        path.startY +
        // quadratic control point
        ' Q' +
        path.pointX +
        comma +
        (current.y * 1.5).toFixed(3) + // 1.5 to amp up the bend a little
        // center point intersection
        ' ' +
        ((current.x) / 10 + path.centerX).toFixed(3) +
        comma +
        ((current.y) / 5 + path.centerY).toFixed(3) +
        // end point with quadratic reflection (T) (so the bottom right mirrors the top left)
        ' T' +
        path.endX +
        comma +
        path.endY;
        path.counter++;

        completedPath += newPathSection;

    };

    return completedPath;

    };

    var createLines = function() {

    var newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
        // higher is slower
        minSpeed = 85,
        maxSpeed = 150;

    // create an arr which contains objects for all lines
    // createPathString() will use this array
    for (var i = 0; i < numberOfLines; i++) {

        var lineDataObj = {
        counter: randomRange(1, 500), // a broad counter range ensures lines start at different cycles (will look more random)
        startX: randomRange(-5, -40),
        startY: randomRange(-5, -30),
        endX: randomRange(200, 220), // viewbox = 200
        endY: randomRange(120, 140), // viewbox = 120
        sin: randomRange(minSpeed, maxSpeed),
        cos: randomRange(minSpeed, maxSpeed),
        pointX: randomRange(30, 55),
        centerX: randomRange(90, 120),
        centerY: randomRange(60, 70)
        }

        lineDataArr.push(lineDataObj)

    }

    var animLoop = function() {
        newPathEl.setAttribute('d', createPathString());
        requestAnimationFrame(animLoop);
    }

    // once the path elements are created, start the animation loop
    svgEl.appendChild(newPathEl);
    animLoop();

    };

    createLines();
//==================== Анимация линий ====================//
    const value = document.querySelectorAll('.calc-cost');
    const valueDop = document.querySelectorAll('.calc-cost-dop');
    const checkInput = document.querySelectorAll('.checkbox__input')
    const items = document.querySelectorAll('._column');
    const itemsDop = document.querySelectorAll('._dop');
    const buttons = document.querySelectorAll('.item-calculator__radio');
    const buttonsAct = document.querySelectorAll('.item-calculator__radio._active');
    for (let index = 0; index < buttonsAct.length; index++) {
        const element = buttonsAct[index];
        value[index].innerHTML = element.getAttribute('data-cost');
        result(0);
    }

    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        element.addEventListener('click', function(e){
            if(e.target.closest('.item-calculator__radio')){
                const cost = e.target.getAttribute('data-cost');
                value[index].innerHTML = cost;
                result(0);
                const children = Array.from(e.target.parentNode.children);
                for (let index = 0; index < children.length; index++) {
                    const element = children[index];
                    if(element.classList.contains("_active")){
                        element.classList.remove('_active');
                    }
                }
                e.target.classList.add('_active');
            }
        })
    }
    for (let index = 0; index < itemsDop.length; index++) {
        const element = itemsDop[index];
        element.addEventListener('click', function(e){
            if(e.target.closest('.checkbox__label')){
                const cost = e.target.previousElementSibling.value;
                
                if(e.target.classList.contains("_active")){
                    e.target.classList.remove("_active");
                    valueDop[index].innerHTML = Number(valueDop[index].innerHTML) - Number(cost);
                }else{
                    e.target.classList.add("_active");
                    valueDop[index].innerHTML =  Number(cost) + Number(valueDop[index].innerHTML);
                }
                result(0);
                
            }
        })
    }
    

    function result(reset){
        let costResult = reset;
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            costResult = costResult + Number(element.innerHTML);
        }
        for (let index = 0; index < valueDop.length; index++) {
            const element = valueDop[index];
            costResult = costResult + Number(element.innerHTML);
        }
        document.getElementById('result').innerHTML =  costResult;
    }
    // Форма калькулятора ========================
    const buttonF = document.querySelector('.item-calculator__button');
    const blockHide = document.querySelector('.form-calculator');
    buttonF.addEventListener('click', function(){
        _slideDown(blockHide, 500);
        buttonF.style.display = 'none';
    })
    // Форма ========================
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        
        if(error === 0){
            
            form.submit();
        }
    }
    // Проверка валидации формы
    function formValidate(form) {
        let error = 0; 

        let formReq = document.querySelectorAll('._req');
            for(let input of formReq){
                formRemoveError(input);
            }
            const phone = document.getElementById('phone');
            if(phone.value === ''){
                phone.classList.add('_error');
                error++;
            }
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                if(input.classList.contains('_name')){
                    if(!validateName(input.value)){
                        formAddError(input);
                        error++;
                    }
                }
                if(input.classList.contains('_tel')){
                    if(!ValidPhone(input.value)){
                        formAddError(input);
                        error++;
                    }
                }
                if(input.classList.contains('_error')){
                    error++;
                }else{
                    if(input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
        
            }
            return error;
    }
    // Функции добавления/удаления классов
    function formAddError(e) {
        e.classList.add('_error');
        
    }
    function formRemoveError(e) {
        e.classList.remove('_error');
        
    }
    // Функция валидации имени
    function validateName(e) {
        return String(e)
        .toLowerCase()
        .match(
            /^[а-яА-я][а-яА-Я0-9-_\.]{1,20}$/
        );
    };
    function ValidPhone(e) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        const valid = re.test(e);
        return valid;
    }  
    //======= robots 
    
   LottieInteractivity.create({
    mode: 'scroll',
    player: '#firstLottie',
    container: '.robot--2',
    actions: [
        {
            visibility: [0.2, 1],
            type: 'seek',
            frames: [20, 201],
        },
    ],
    });
    //=================
    //SlideToggle
    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
    _slideUp(blockHide, 0);
});



