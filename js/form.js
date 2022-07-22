var botaoAdicionar = document.querySelector("#adicionar-paciente")
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    /* Extraindo informações do paciente do form*/  
    var paciente = obtemPacienteDoFormulario(form);

    /** criando mensagem de erro */
    var erros = validaPaciente(paciente);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);   
            return;
        
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro")
    mensagensErro.innerHTML = "" /** apagando ul inteira de erro*/
    
});


function adicionaPacienteNaTabela(paciente){
    
    var pacienteTr = montaTr(paciente) /** cria a tr e td do paciente  */
    var tabela = document.querySelector("#tabela-pacientes")/** adicionando o paciente a tabela */
    tabela.appendChild(pacienteTr);
}



 /** como criar um obejto */
function obtemPacienteDoFormulario(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;

}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");


    /** adicionando o cliente na tabela */
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"))

    return pacienteTr;
}

    function montaTd(dado,classe){
        var td = document.createElement("td");
        td.textContent = dado;
        td.classList.add(classe);

        return td;
    }

    /** criando mensagem de erro */
    function exibeMensagensDeErro(erros){
        var ul = document.querySelector("#mensagens-erro");
        ul.innerHTML = "" /** apagando as mensagens de erro */

        erros.forEach(function(erro){
            var li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        });
    }

    function validaPaciente(paciente){
        var erros = [];

        if(paciente.nome.length == 0){
            erros.push("campo nome não pode ser vazio")
        }

        if(!validaPeso(paciente.peso)){
            erros.push("peso inválido")
        } 

        if(!validaAltura(paciente.altura)){
            erros.push("Altura é inválida")
        }

        if(paciente.gordura.length == 0){
            erros.push("campo de gordura não pode ser vazio")
        }

        if(paciente.peso.length == 0){
            erros.push("campo de peso não pode ser vazio")
        }

        if(paciente.altura.length == 0){
            erros.push("campo de altura não pode ser vazio")
        }

        return erros;
    }
