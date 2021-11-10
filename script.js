let questaoAtual = 0;

let score = 0;

mostrarQuestao();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function mostrarQuestao(){
    if(perguntas[questaoAtual]){
        let q = perguntas[questaoAtual];

        let pct = Math.floor((questaoAtual / perguntas.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'nome';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.pergunta;
        
        let opcoesHTML = '';
        for(let i in q.opcoes){
            opcoesHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.opcoes[i]}</div>`;
        }
        document.querySelector('.options'). innerHTML = opcoesHTML;

        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', opcaoClick);
        });
        
    }else{
        //acabaram as questões!

        finalQuiz();
    }
}

function opcaoClick(e){
    let opcaoClicada = parseInt(e.target.getAttribute('data-op'));

    if(perguntas[questaoAtual].resposta == opcaoClicada){

        score++;

        console.log("Acertou!!!")
    } else{
        console.log("Errou!!!")
    }

    questaoAtual++;
    mostrarQuestao();
}

function finalQuiz(){
    let pontos = Math.floor((score / perguntas.length) * 100);

    if(pontos < 30){
        document.querySelector('.scorePct').style.color = '#ff4242';
    } else if(pontos >= 30 && pontos < 70){
        document.querySelector('.scorePct').style.color = '#ffd642';
    } else{
        document.querySelector('.scorePct').style.color = '#42ff7e';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${pontos}%`
    document.querySelector('.scoreText2').innerHTML = `Você acertou ${score} de ${perguntas.length}!`

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent(){
    score = 0;
    questaoAtual = 0;
    mostrarQuestao();
    document.querySelector('.scoreArea').style.display = 'none';
}
