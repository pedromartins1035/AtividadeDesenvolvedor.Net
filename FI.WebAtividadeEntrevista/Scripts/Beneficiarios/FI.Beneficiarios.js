﻿var beneficiarios = [];
var alterado = false;
var idAlterado = -1;
$(document).ready(function () {

    var myModal = '<div id="md_beneficiario" class="modal fade"></div>'
    $('body').append(myModal);

    if ($('#formCadastro #Beneficiarios').val() != "") {

        var objBeneficiarios = JSON.parse($('#formCadastro #Beneficiarios').val())
        objBeneficiarios.forEach(function (item, index) {
            beneficiarios.push(item)
        })
    }

    $('#btn_beneficiario').click(function () {
        $('#md_beneficiario').html('')
        $.get(urlModal, function (res) {

            $('#md_beneficiario').append(res);
            $('#md_beneficiario').modal('show')

            $("#cpf_benef").mask('000.000.000-00', { placeholder: "Ex.: 999.999.999-99" });

            if (beneficiarios.length != 0) {
                ListBeneficiarios(beneficiarios)
            }

            $('#btn_incluir').click(function () {

                var obj = {
                    CPF: $("#cpf_benef").val(),
                    Nome: $("#nome_benef").val()
                };

                if (obj.CPF.length != 14 || obj.CPF == "" || obj.Nome == "") {
                    alert("Campos estão incorretos")
                    return;
                }
                else {

                    if (cpfRepetido(beneficiarios, obj.CPF)) return alert("Este CPF já esta sendo utilizado");

                    if (alterado) {
                        alterado = false;
                        beneficiarios[idAlterado].CPF = obj.CPF;
                        beneficiarios[idAlterado].Nome = obj.Nome;
                        beneficiarios[idAlterado].Alterado = true;
                    }
                    else {
                        beneficiarios.push(obj);
                    }

                    ListBeneficiarios(beneficiarios);

                    $("#cpf_benef").val("");
                    $("#nome_benef").val("");

                    $('#formCadastro #Beneficiarios').val(JSON.stringify(beneficiarios));
                }
            })

        })

    })
})



function ListBeneficiarios(beneficiarios) {

    $('table tbody').html('');

    for (var i = 0; i < beneficiarios.length; i++) {
        $('table tbody').append('<tr id=' + i + '>');
    }
    beneficiarios.forEach(function (item, index) {
        $('table tbody tr#' + index).append("<td style='width: 200px;'>" + item.CPF + "</td>")
        $('table tbody tr#' + index).append("<td style='width: 200px;'>" + item.Nome + "</td>")
        $('table tbody tr#' + index).append('<td><button type="button" id="btn_alterar" class="btn btn-sm btn-primary" onclick="alterar(' + index + ')">Alterar</button></td>')
        $('table tbody tr#' + index).append('<td><button type="button" id="btn_excluir" class="btn btn-sm btn-primary" onclick="deletar(' + index + ')">Excluir</button></td>')

    })
}

function cpfRepetido(beneficiarios, cpf) {

    var valida = false;
    beneficiarios.forEach(function (item, index) {
        if (!(alterado && item.Id == beneficiarios[idAlterado].Id && item.CPF == cpf)) {
            if (item.CPF == cpf) {
                valida = true
            }
        }
    })

    return valida;
}

function alterar(num) {
    alterado = true;
    idAlterado = num;
    $("#cpf_benef").val(beneficiarios[num]["CPF"]);
    $("#nome_benef").val(beneficiarios[num]["Nome"]);
}

function deletar(num) {
    beneficiarios.splice(num, 1);
    $('#formCadastro #Beneficiarios').val(JSON.stringify(beneficiarios));
    ListBeneficiarios(beneficiarios);
}