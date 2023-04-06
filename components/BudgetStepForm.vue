<template>
  <div>
    <b-container class="mt-5">
      <b-card :title="cardTitle">
        <validation-observer ref="observer">
          <b-form @submit.prevent="onSubmit">
            <div id="step1" v-if="currentStep == 1">
              <validation-provider name="Nome" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="input-group-1" label="Nome" label-for="input-1">
                  <b-form-input id="input-1" v-model="step1.nome" type="text" placeholder="Nome"
                    :state="getValidationState(validationContext)"></b-form-input>
                  <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="E-mail" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="input-group-2" label="E-mail" label-for="input-2">
                  <b-form-input id="input-2" v-model="step1.email" type="text" placeholder="E-mail"
                    :state="getValidationState(validationContext)"></b-form-input>
                  <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Telefone" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="input-group-3" label="Telefone" label-for="input-3">
                  <b-form-input id="input-3" v-model="step1.telefone" type="text" placeholder="Telefone"
                    :state="getValidationState(validationContext)"></b-form-input>
                  <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <b-container>
                <b-row>
                  <b-col cols="8" class="px-0">
                    <validation-provider name="Rua" :rules="{ required: true }" v-slot="validationContext">
                      <b-form-group id="input-group-4" label="Rua" label-for="input-4">
                        <b-form-input id="input-4" v-model="step1.logradouro" type="text" placeholder="Rua"
                          :state="getValidationState(validationContext)"></b-form-input>
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col class="pr-0">
                    <validation-provider name="Número" :rules="{ required: true }" v-slot="validationContext">
                      <b-form-group id="input-group-5" label="Número" label-for="input-5">
                        <b-form-input id="input-5" v-model="step1.numero" type="text" placeholder="Número"
                          :state="getValidationState(validationContext)"></b-form-input>
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </b-container>
              <validation-provider name="Cidade" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="input-group-6" label="Cidade" label-for="input-6">
                  <b-form-input id="input-6" v-model="step1.cidade" type="text" placeholder="Cidade"
                    :state="getValidationState(validationContext)"></b-form-input>
                  <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider name="Estado" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="input-group-7" label="UF" label-for="input-7">
                  <b-form-input id="input-7" v-model="step1.uf" type="text" placeholder="UF"
                    :state="getValidationState(validationContext)"></b-form-input>
                  <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <b-button type="button" variant="primary"
                @click.prevent="goToStep(2, 'Informações do Sistema')">Continuar</b-button>
            </div>
            <div id="step2" v-if="currentStep == 2">
              <b-form-group label="Informe os tipos de sistema que gostaria." v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group id="checkbox-group-2" v-model="step2.systemType"
                  :aria-describedby="ariaDescribedby" @change="showModules()">
                  <b-form-checkbox value="web">Web</b-form-checkbox>
                  <b-form-checkbox value="desktop">Desktop</b-form-checkbox>
                  <b-form-checkbox value="mobile">Mobile</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <b-row no-gutters v-if="step2.systemWeb">
                <b-col>
                  <hr class="hr" />
                  <div>
                    <h5>Web</h5>
                  </div>
                  <b-form-group label="Navegadores suportados" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group id="checkbox-group-3" v-model="step2.web.navegadores"
                      :aria-describedby="ariaDescribedby">
                      <b-form-checkbox value="chrome">Google Chrome</b-form-checkbox>
                      <b-form-checkbox value="firefox">Mozilla Firefox</b-form-checkbox>
                      <b-form-checkbox value="edge">Microsoft Edge</b-form-checkbox>
                      <b-form-checkbox value="explorer">Microsoft Internet Explorer</b-form-checkbox>
                      <b-form-checkbox value="opera">Opera</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                  <div class="mb-3">
                    <label for="range-1">Quantidade de Páginas</label>
                    <div class="d-flex align-items-center">
                      <b-form-input id="range-1" v-model="step2.web.qtdPaginas" type="range" min="1"
                        max="100"></b-form-input>
                      <div class="mx-2">{{ step2.web.qtdPaginas }}</div>
                    </div>
                  </div>
                  <b-form-group label="Deseja sistema de login?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.web.login" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.web.login" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                  <b-form-group label="Deseja sistema de pagamentos?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.web.pagamentos" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.web.pagamentos" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="step2.systemDesk">
                <b-col>
                  <hr class="hr" />
                  <div>
                    <h5>Desktop</h5>
                  </div>
                  <b-form-group label="Sistemas operacionais suportados" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group id="checkbox-group-3" v-model="step2.desktop.sistemasOperacionais"
                      :aria-describedby="ariaDescribedby">
                      <b-form-checkbox value="windows">Windows</b-form-checkbox>
                      <b-form-checkbox value="linux">Linux</b-form-checkbox>
                      <b-form-checkbox value="mac">MacOs</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                  <div class="mb-3">
                    <label for="range-1">Quantidade de Telas</label>
                    <div class="d-flex align-items-center">
                      <b-form-input id="range-1" v-model="step2.desktop.qtdTelas" type="range" min="1"
                        max="100"></b-form-input>
                      <div class="mx-2">{{ step2.desktop.qtdTelas }}</div>
                    </div>
                  </div>
                  <b-form-group label="O sistema precisa suportar impressoras?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.desktop.impressora" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.desktop.impressora" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                  <b-form-group label="Deseja sistema de licenças de acesso?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.desktop.licencaAcesso" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.desktop.licencaAcesso" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row no-gutters v-if="step2.systemMob">
                <b-col>
                  <hr class="hr" />
                  <div>
                    <h5>Mobile</h5>
                  </div>
                  <b-form-group label="Plataformas suportadas" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group id="checkbox-group-3" v-model="step2.mobile.plataformas"
                      :aria-describedby="ariaDescribedby">
                      <b-form-checkbox value="iphone">Iphone</b-form-checkbox>
                      <b-form-checkbox value="Android">Android</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                  <div class="mb-3">
                    <label for="range-1">Quantidade de Telas</label>
                    <div class="d-flex align-items-center">
                      <b-form-input id="range-1" v-model="step2.mobile.qtdTelas" type="range" min="1"
                        max="100"></b-form-input>
                      <div class="mx-2">{{ step2.mobile.qtdTelas }}</div>
                    </div>
                  </div>
                  <b-form-group label="Deseja sistema de login?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.mobile.login" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.mobile.login" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                  <b-form-group label="Deseja sistema de pagamentos?" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="step2.mobile.pagamentos" :aria-describedby="ariaDescribedby"
                      value="true">Sim</b-form-radio>
                    <b-form-radio v-model="step2.mobile.pagamentos" :aria-describedby="ariaDescribedby"
                      value="false">Não</b-form-radio>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button type="button" variant="primary"
                @click.prevent="goToStep(3, 'Confirmação de Dados')">Continuar</b-button>
            </div>
            <div id="step3" v-if="currentStep == 3">
              <div>
                <h5>Dados para Contato</h5>
                <strong>Nome:</strong> {{ step1.nome }}<br />
                <strong>E-mail:</strong> {{ step1.email }}<br />
                <strong>Telefone:</strong> {{ step1.telefone }}<br />
                <strong>Rua:</strong> {{ step1.logradouro }}, {{ step1.numero }}<br />
                <strong>Cidade:</strong> {{ step1.cidade }}<br />
                <strong>Estado:</strong> {{ step1.uf }}<br />
              </div>
              <hr class="hr" />
              <div class="mb-3">
                <h5>Informações do Sistema</h5>
                <div v-if="step2.systemWeb" class="mt-3">
                  <h5>Web</h5>
                  <strong>Navegadores:</strong>
                  <span v-for="navegador in step2.web.navegadores">
                    <span v-if="navegador === 'chrome'">Google Chrome, </span>
                    <span v-if="navegador === 'firefox'">Mozilla Firefox, </span>
                    <span v-if="navegador === 'edge'">Microsoft Edge, </span>
                    <span v-if="navegador === 'explorer'">Microsoft Internet Explorer, </span>
                    <span v-if="navegador === 'opera'">Opera, </span>
                  </span><br />
                  <strong>Quantidade de Páginas:</strong> {{ step2.web.qtdPaginas }}<br />
                  <strong>Sistema de Login:</strong> {{ step2.web.login ? 'Sim' : 'Não' }}<br />
                  <strong>Sistema de Pagamentos:</strong> {{ step2.web.pagamentos ? 'Sim' : 'Não' }}<br />
                </div>
                <div v-if="step2.systemDesk" class="mt-3">
                  <h5>Desktop</h5>
                  <strong>Sistemas Operacionais:</strong>
                  <span v-for="sistema in step2.desktop.sistemasOperacionais">
                    <span v-if="sistema === 'windows'">Windows, </span>
                    <span v-if="sistema === 'linux'">Linux, </span>
                    <span v-if="sistema === 'mac'">MacOS, </span>
                  </span><br />
                  <strong>Quantidade de Telas:</strong> {{ step2.desktop.qtdTelas }}<br />
                  <strong>Suporta Impressoras:</strong> {{ step2.desktop.impressora ? 'Sim' : 'Não' }}<br />
                  <strong>Sistema de Licenças de Acesso:</strong> {{ step2.desktop.licencaAcesso ? 'Sim' : 'Não' }}<br />
                </div>
                <div v-if="step2.systemMob" class="mt-3">
                  <h5>Mobile</h5>
                  <strong>Plataformas:</strong>
                  <span v-for="plataforma in step2.mobile.plataformas">
                    <span v-if="plataforma === 'iphone'">Iphone, </span>
                    <span v-if="plataforma === 'android'">Android, </span>
                  </span><br />
                  <strong>Quantidade de Telas:</strong> {{ step2.mobile.qtdTelas }}<br />
                  <strong>Sistema de Login:</strong> {{ step2.mobile.login ? 'Sim' : 'Não' }}<br />
                  <strong>Sistema de Pagamentos:</strong> {{ step2.mobile.pagamentos ? 'Sim' : 'Não' }}<br />
                </div>
              </div>
              <b-button type="submit" variant="primary">Finalizar</b-button>
            </div>
            <div id="step4" v-if="currentStep == 4">
              <h4>Dados enviados com sucesso!</h4>
            </div>
          </b-form>
        </validation-observer>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: 'BudgetStepForm',
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data() {
    return {
      errors: [],
      currentStep: 1,
      cardTitle: 'Dados para Contato',
      step1: {
        name: '',
        email: '',
        telefone: '',
        logradouro: '',
        numero: '',
        cidade: '',
        uf: '',
      },
      step2: {
        systemType: [],
        systemWeb: false,
        systemDesk: false,
        systemMob: false,
        web: {
          qtdPaginas: 1,
          navegadores: [
            'chrome'
          ],
          login: false,
          pagamentos: false,
        },
        desktop: {
          qtdTelas: 1,
          sistemasOperacionais: [
            'windows'
          ],
          impressora: false,
          licencaAcesso: false,
        },
        mobile: {
          qtdTelas: 1,
          plataformas: [
            'iphone'
          ],
          login: false,
          pagamentos: false,
        }
      }
    }
  },
  ready: function () {
    console.log('ready');
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    onSubmit(event) {
      this.cardTitle = '';
      this.currentStep = 4;
      console.log(JSON.stringify(this.form));
    },
    formValid(object) {
      return Object.keys(object).every(field => {
        return object[field] && object[field].valid;
      });
    },
    goToStep: async function (step, cardTitle = false) {

      this.$refs.observer.validate().then(success => {

        if (step === 3 && this.step2.systemType.length === 0) {
          this.makeToast('Erro', 'Por favor, selecione ao menos um tipo de sistema.');
          return;
        }

        if (!success) {
          return;
        }

        if (cardTitle) {
          this.cardTitle = cardTitle;
        }

        this.currentStep = step;

      });

    },
    showModules: function () {
      this.step2.systemWeb = this.step2.systemType.filter((element) => { return element === 'web'; }).length > 0;
      this.step2.systemDesk = this.step2.systemType.filter((element) => { return element === 'desktop'; }).length > 0;
      this.step2.systemMob = this.step2.systemType.filter((element) => { return element === 'mobile'; }).length > 0;
    },
    makeToast: function (title, message) {
      this.$bvToast.toast(message, {
        title: title,
        solid: true
      })
    }
  }
}
</script>
