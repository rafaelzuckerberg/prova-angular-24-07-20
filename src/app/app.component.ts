import { User } from './shared/class/user';
import { UserService } from './shared/services/user.service';
import { CepService } from './shared/services/cep.service';
import { Component, ViewChild } from '@angular/core'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'teste-helpper'
	columns: string[] = ['name', 'cpf', 'phone', 'email', 'cep', 'state', 'city', 'street', 'actions']
	selectedPerson: User;
	loading
	btn_texto: string = 'Salvar';
	persons: MatTableDataSource<User>;
	
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor(public cep: CepService, private service: UserService) { }

	ngOnInit() {
		if (!this.service.get() || !JSON.parse(this.service.get()).length) this.service.populateTable()
		this.getUsers();
	}


	getUsers() {
		this.persons = new MatTableDataSource(JSON.parse(this.service.get()));
		this.persons.paginator = this.paginator;
		this.persons.sort = this.sort;
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


	applyFilter(filterValue: string) {
		this.persons.filter = filterValue.trim().toLowerCase();
	
		if (this.persons.paginator) {
		  this.persons.paginator.firstPage();
		}
	  }
}

