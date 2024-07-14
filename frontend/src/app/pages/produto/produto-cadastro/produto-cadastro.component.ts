import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { FormFieldListComponent } from '../../../shared/components/form-field-list/form-field-list.component';
import { DeleteActionComponent } from '../../../shared/components/header/delete-action/delete-action.component';
import { SaveActionComponent } from '../../../shared/components/header/save-action/save-action.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { fileToBase64 } from '../../../shared/helpers/image.helper';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { IProduto } from '../../../shared/interfaces/produto.interface';

const actions = [SaveActionComponent, DeleteActionComponent];
const form = [FormFieldListComponent];
const imports = [...actions, ...form, PageLayoutComponent, CommonModule];

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports,
  templateUrl: './produto-cadastro.component.html',
})
export class ProdutoCadastroComponent extends BaseCadastroComponent<IProduto> {
  constructor(
    private readonly _produtoService: ProdutoService,
    protected override readonly _injector: Injector,
  ) {
    super(_produtoService, _injector);
  }

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    custo: new FormControl(null, [Validators.min(0)]),
    imagem: new FormControl<string | null>(null),
    produtoloja: new FormControl(
      [],
      [Validators.required, Validators.minLength(1)],
    ),
  });

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-2',
      label: 'Descrição',
      formControlName: 'descricao',
      placeholder: 'Ex.: Arroz',
    },
    {
      type: EFieldType.INPUT,
      class: 'grid-1',
      label: 'Custo',
      formControlName: 'custo',
      placeholder: 'Ex.: 9.999',
    },
    {
      type: EFieldType.IMAGE,
      class: 'grid-1',
      label: 'Imagem',
      formControlName: 'imagem',
      placeholder: '',
    },
  ];

  async beforeSave() {
    const image = this.cadastroForm.get('imagem')?.value;

    if (image) {
      const file = new File([image], 'filename');
      const base64 = await fileToBase64(file);

      this.cadastroForm.get('imagem')?.setValue(base64);
    }

    this.save();
  }
}
