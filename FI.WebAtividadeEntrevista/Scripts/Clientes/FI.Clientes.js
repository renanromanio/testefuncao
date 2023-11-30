
const listaBeneficiarios = [];
$(document).ready(function () {

    class Beneficiario {
        constructor(CPF, Nome) {
            this.CPF = CPF.replace(/[^\d]/g, '');
            this.Nome = Nome;
        }
    }

    if (obj) {
        $('#formCadastro #Id').val(obj.Id);
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #CPF').prop("disabled", true);
    }

    $("#CPF").mask('999.999.999-99');
    $("#CPFBeneficiario").mask('999.999.999-99');

    $("#incBeneficiario").click(function () {
        if ($("#formBeneficiario").valid()) {
            var cpfBenef = $("#CPFBeneficiario").val();
            var nomeBenef = $("#NomeBeneficiario").val();
            listaBeneficiarios.push(new Beneficiario(cpfBenef, nomeBenef));

            $("#CPFBeneficiario").val("");
            $("#NomeBeneficiario").val("");

            console.log(listaBeneficiarios);
            $('#gridBeneficiarios').find('tbody').children('.jtable-no-data-row').remove()

            var newRow = `<tr class="jtable-data-row jtable-row-even">
                      <td>${cpfBenef}</td>
                      <td>${nomeBenef}</td>
                      <td><button type="button" class="btn btn-primary btn-sm" disabled>Alterar</button></td>
                      <td><button type="button" class="btn btn-primary btn-sm" disabled>Excluir</button></td>
                    </tr>`;
            $('#gridBeneficiarios').find('tbody').append(newRow);
        }
        else {
            alert("Verifique os campos do Beneficiário e tente novamente.")
        }
    });

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: "/Cliente/BeneficiariosList?idCliente=" + $("#Id").val(),
            },
            fields: {
                CPF: {
                    title: 'CPF',
                    width: '50%'
                },
                Nome: {
                    title: 'Nome',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button type="button" class="btn btn-primary btn-sm" disabled>Alterar</button>';
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return '<button type="button" class="btn btn-primary btn-sm" disabled>Excluir</button>';
                    }
                }
            }
        });



    if (document.getElementById("gridBeneficiarios")) {
        $('#gridBeneficiarios').jtable('load');
        //$('#gridBeneficiarios').jtable('hideColumn', 'ID');
    }


    $.validator.addMethod('validaCpf', function (value, element) {
        return validarCPF(value);
    }, 'CPF inválido.');

    $.validator.addMethod('verificaExistenciaCPF', function (value, element) {

        var existeCPFIgual = VerificarExistenciaCPF(value);
        if (existeCPFIgual == "True") {
            return false;
        }
        else {
            return true;
        }
    }, 'CPF já cadastrado no sistema.');

    $.validator.addMethod('verificaExistenciaCPFBeneficiario', function (value, element) {

        var existeCPFIgual = VerificaExistenciaCPFBeneficiario(value);
        if (existeCPFIgual == "True") {
            return false;
        }
        else {
            return true;
        }
    }, 'CPF de Beneficiário já inserido para este Cliente.');

    $('#formCadastro').validate({
        rules: {
            CPF: {
                required: true,
                validaCpf: true,
                verificaExistenciaCPF: true
            }
        },
        messages: {
            CPF: {
                required: 'Por favor, insira um CPF.',
                validaCpf: 'CPF inválido.',
                verificaExistenciaCPF: 'CPF já cadastrado no sistema.'
            }
        }
    });

    $('#formBeneficiario').validate({
        rules: {
            CPF: {
                required: true,
                validaCpf: true,
                verificaExistenciaCPFBeneficiario: true
            }
        },
        messages: {
            CPFBeneficiario: {
                required: 'Por favor, insira um CPF.',
                validaCpf: 'CPF inválido.',
            }
        }
    });

    $('#btnSalvar').click(function () {
        if ($("#formCadastro").valid()) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $("#Nome").val(),
                    "CEP": $("#CEP").val(),
                    "Email": $("#Email").val(),
                    "Sobrenome": $("#Sobrenome").val(),
                    "Nacionalidade": $("#Nacionalidade").val(),
                    "Estado": $("#Estado").val(),
                    "Cidade": $("#Cidade").val(),
                    "Logradouro": $("#Logradouro").val(),
                    "Telefone": $("#Telefone").val(),
                    "CPF": $("#CPF").val().replace(/[^\d]/g, ''),
                    "Beneficiarios": listaBeneficiarios
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                    }
            });
        }
        else {
            alert("Verifique os campos e tente novamente.");
        }
    })
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function VerificarExistenciaCPF(cpf) {
    var retorno = "";
    $.ajax({
        type: 'GET',
        async: false,
        url: 'VerificarExistenciaCPF',
        data: { "CPF": cpf.replace(/[^\d]/g, '') },
        success: function (data) {
            retorno = data
        }
    });
    return retorno;
}

function VerificaExistenciaCPFBeneficiario(CPF) {
    var retorno;
    var cpfFormatado = CPF.replace(/[^\d]/g, '');
    var existeCPFnaoSalvo = listaBeneficiarios.find(x => x.CPF == cpfFormatado) != null

    if (existeCPFnaoSalvo) {
        retorno = "True";
    }
    else if($("#Id").val() != "") {
        $.ajax({
            type: 'GET',
            async: false,
            url: '/Cliente/VerificarExistenciaCPFBeneficiario',
            data: { "CPFBeneficiario": cpfFormatado, "IDCliente": $("#Id").val() },
            success: function (data) {
                retorno = data
            }
        });
    }
    return retorno;          
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
