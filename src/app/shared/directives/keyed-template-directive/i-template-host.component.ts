import { KeyedTemplateDirective } from './keyed-template.directive';

export interface ItemplateHostComponent {
    registerTemplate(key: string, _that: KeyedTemplateDirective): void;
}

export interface KeyedTempalteDirectiveObject {
    [key: string]: KeyedTemplateDirective;
}
