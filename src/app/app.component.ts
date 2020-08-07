import { User } from './shared/class/user';
import { UserService } from './shared/services/user.service';
import { CepService } from './shared/services/cep.service';
import { Component } from '@angular/core'; 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'teste-helpper'

	persons = []
	columns = ['name', 'cpf', 'phone', 'email', 'cep', 'state', 'city', 'street', 'actions']
	selectedPerson: User;
	loading
	btn_texto: string = 'Salvar';

	constructor(public cep: CepService, private service: UserService) { }

	ngOnInit() {
		if (!this.service.get() || !JSON.parse(this.service.get()).length) this.service.populateTable()
		this.persons = JSON.parse(this.service.get())
		console.log(this.selectedPerson)
	}


	deletePerson(person) {
		this.service.remove(person)
		this.persons = JSON.parse(this.service.get());
	}


	changeCep(event) {
		var cep = event.target.value
		if (cep.length == 8) {
			this.loading = true
			this.cep.getCep(cep).then((apiResponse: any) => {
				if (apiResponse.erro) {
					alert('Cep não encontrado')
				} else {
					this.selectedPerson = {
						...this.selectedPerson,
						cep: apiResponse.cep.replace('-', ''),
						state: apiResponse.uf,
						city: apiResponse.localidade,
						street: apiResponse.logradouro
					}
				}
			}).catch(error => {
				alert('Erro ao buscar o cep')
				console.error(error)
			}).finally(() => this.loading = false)
		}
	}


	cancel() {
		this.selectedPerson = null
	}


	submit(person) {
		var error = false
		this.columns.forEach(key => {
			if (key != 'actions' && !person[key]) {
				error = true
			}
		})

		if (error) {
			alert('Erro!\nPreencha todos os campos!')
		} else {
			this.service.save(person)
			this.persons = JSON.parse(this.service.get())
			this.selectedPerson = null
		}
	}


	addPerson() {
		this.selectedPerson = {}
	}


	editPerson(person) {
		this.selectedPerson = { ...person }
		this.btn_texto = 'Editar';
	}
}

