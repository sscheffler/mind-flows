"use strict";

interface IId {
  id: string;
}

export interface Stakeholder{ email: string; login: string; passwd: string; }
export interface KnowledgeFlow{ name: string; comment: string; rootSteps: Array<FlowStep>; visibiliyPublic: boolean}

export class FlowStep {
  concern: string;
  childs: Array<FlowStep> = [];

  constructor(concern: string) { this.concern = concern; }
}

export class MindFlow implements IId, KnowledgeFlow{
  visibiliyPublic: boolean;
  id: string;
  name: string;
  comment: string;
  rootSteps: Array<FlowStep> = [];
  linkedConcepts: Array<Concept> = [];
  constructor(name: string, comment: string, visibiliyPublic: boolean) { this.name = name; this.comment = comment; this.visibiliyPublic = visibiliyPublic; }
}

export class Concept implements IId, KnowledgeFlow{
  visibiliyPublic: boolean;
  id: string;
  name: string;
  comment: string;
  rootSteps: Array<FlowStep> = [];
  linkedConcepts: Array<Concept> = [];
  constructor(name: string, comment: string, visibiliyPublic: boolean) { this.name = name; this.comment = comment; this.visibiliyPublic = visibiliyPublic; }
}


export class Administrator implements IId, Stakeholder{
  id: string;
  email: string;
  login: string;
  passwd: string;
  constructor(email: string, login: string, passwd: string) {
    this.email = email;
    this.login = login;
    this.passwd = passwd;
  }
}

export class User implements IId, Stakeholder{
  id: string;
  email: string;
  login: string;
  passwd: string;
  deactivated: boolean = false;
  flows: Array<KnowledgeFlow> = [];
  constructor(email: string, login: string, passwd: string) {
    this.email = email;
    this.login = login;
    this.passwd = passwd;
  }
}

export class UserGroup implements IId{
  id: string;
  name: string;
  users: Array<User>;

  constructor(name: string) { this.name = name; }
}