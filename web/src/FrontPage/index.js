import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

import retext from 'retext';
import keywords from 'retext-keywords';
import nlcstToString from 'nlcst-to-string';

class Frontpage extends React.Component {

  render() {
    return (

         <div>
         <FilteredList />
         </div>

    );
  }
}


// FilteredList Component starts from here
class FilteredList extends React.Component{
  constructor(){
    super();
    this.state = {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
    }


    this.filterList = this.filterList.bind(this);
  }


  filterList(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }


  componentWillMount(){
    this.setState({items: this.state.initialItems})
  }


  render(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Type here" onChange={this.filterList}/>
        </fieldset>
        </form>
      <List items={this.state.items}/>
      </div>
    );
  }
}




class List extends React.Component{
  render(){
    return (
      <ul className="list-group">
      {
        this.props.items.map(function(item) {
          return <li className="list-group-item" data-category={item} key={item}>{item}</li>
        })
       }
      </ul>
    )
  }
};

//export default FilteredList;



class Card extends React.Component {
  render() {
    return(
      <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <span className="tag is-light is-medium">{this.props.name}</span>
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-angle-down" aria-hidden="false"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <ToDolist todos={this.props.todos}/>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" onClick={this.props.onClickDelete}>Delete</a>
        <a href="#" class="card-footer-item" onClick={this.props.onClickMove}>Done</a>
      </footer>
      </div>
    );
  }
}

class ToDo extends React.Component {
  render(){
    var defaultClass = 'callout';

    defaultClass += this.props.done ? ' callout-success' : ' callout-info';

    return (
      <div className={defaultClass}>
        <i className='fa fa-check mark-done' onClick={this.props.onClickDone}></i>
        <span>{this.props.value}</span>
        <i className='fa fa-times' onClick={this.props.onClickClose}></i>
      </div>
    );
  }
}

class ToDolist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    this.state.todos = this.props.todos;
  }
   addTodo = (event) => {
    if(event.key == 'Enter'){
      var todos = this.state.todos;
      todos.push({
        value: this.state.inputValue,
        done: false
      });
      this.setState({
        todos: todos,
        inputValue : ''
      });
      //return false;
    }
  }

   handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

   removeTodo = (index) => {
    this.state.todos.splice(index,1);

    this.setState({
     todos: this.state.todos
    });
  }

   markTodoDone = (index) => {
    var todos = this.state.todos;
    var todo = this.state.todos[index];
    todos.splice(index,1);
    todo.done = !todo.done;
    todo.done ? todos.push(todo) : todos.unshift(todo);
    this.setState({
      todos: todos
    });
  }

  render(){
    var todos = this.state.todos.map(function(todo, index) {
       return (
         <ToDo
         key={index}
         value={todo.value}
         done={todo.done}
         onClickClose={this.removeTodo.bind(this, index)}
         onClickDone={this.markTodoDone.bind(this, index)}
       /> );
     }.bind(this));
    return(
         <div>
           Sub Tasks
           <form
             role='form'
            >
               <div className="field">
                  <div className="control">
                    <input onKeyPress={this.addTodo} onChange={this.handleChange} value={this.state.inputValue} className="input" type="text" placeholder="What do you need to do?"/>
                  </div>
              </div>
             {todos}
           </form>
         </div>
    );
  }

}

class Container extends React.Component{
  constructor(props){
    super(props);


    this.state = {
      todos: [
        {
          taskName : 'The Awesome task',
          todos: [
            { value: 'Be Awesome', done: false},
            { value: 'I am done being awesome', done: false},
            { value: 'Start hacker ranking', done: false}
          ]
        },
        {
          taskName : 'The bad task',
          todos: [
            { value: 'Be Awe', done: false},
            { value: 'I am done being awestruck', done: false},
            { value: 'Hacker rankered', done: false}
          ]
        },
        {
          taskName : 'The Dreamer task',
          todos: [
            { value: 'Dream Worker', done: false},
            { value: 'Leave your Dreams', done: false},
            { value: 'London Dreams', done: false}
          ]
        }
      ],
      inProgress: [
        {
          taskName : 'Progress 1 task',
          todos: [
            { value: 'Awesome Progress', done: false},
            { value: 'Are we progressing', done: false},
            { value: 'Yew we are', done: false}
          ]
        },
        {
          taskName : 'Progress 2 task',
          todos: [
            { value: 'Be Awe', done: false},
            { value: 'Pro Progress', done: false},
            { value: 'Love Progres', done: false}
          ]
        }
      ],
      completed: [
        {
          taskName : 'Completed task1',
          todos: [
            { value: 'Be Awe', done: true},
            { value: 'Pro Progress', done: true},
            { value: 'Love Progres', done: true}
          ]
        },
        {
          taskName : 'CompletedTask2',
          todos: [
            { value: 'Be Awe', done: true},
            { value: 'Pro Progress', done: true},
            { value: 'Love Progres', done: true}
          ]
        }
      ]
    }
  }



  deleteCard = (index, type) => {
   if(type =='todos'){
     this.state.todos.splice(index,1);
     this.setState({
      todos: this.state.todos
     });
   }
   if(type =='inProgress'){
     this.state.inProgress.splice(index,1);
     this.setState({
      inProgress: this.state.inProgress
     });
   }
   if(type =='completed'){
     this.state.completed.splice(index,1);
     this.setState({
      completed: this.state.completed
     });
   }
 }

 moveCard = (index, type) => {
   if(type =='todos'){
     var card =  this.state.todos[index];
     this.state.todos.splice(index,1);
     this.setState({
      todos: this.state.todos
     });
     this.state.inProgress.push(card);
     this.setState({
      inProgress: this.state.inProgress
     });

   }
 }

  render() {
    var todos = this.state.todos.map(function(todo, index) {
       return (
         <div>

         <Card
         key={index}
         name={todo.taskName}
         todos={todo.todos}
         onClickDelete={this.deleteCard.bind(this, index, 'todos')}
         onClickMove={this.moveCard.bind(this, index, 'todos')}/><br/>

         <h6>{annotate("This is me. submit the project for artificial intelligence tomorrow")}</h6>
         </div>
       );
     }.bind(this));
    var inProgress = this.state.inProgress.map(function(todo, index) {
      return (
        <div><Card
        key={index}
        name={todo.taskName}
        todos={todo.todos}
        onClickDelete={this.deleteCard.bind(this, index, 'inProgress')}/><br/></div>
      );
    }.bind(this));
    var completed = this.state.completed.map(function(todo, index) {
      return (
        <div><Card
        key={index}
        name={todo.taskName}
        todos={todo.todos}
        onClickDelete={this.deleteCard.bind(this, index, 'completed')}/><br/></div>
      );
    }.bind(this));
    return(
      <div className="columns">
          <div className="column">
            <section class="hero is-medium is-dark is-bold">
            <span className="tag is-info is-large">#ToDo</span>
            {todos}
            </section>
          </div>
          <div className="column">
            <section class="hero is-medium is-dark is-bold">
            <span className="tag is-warning is-large">#InProgress</span>
            {inProgress}
            </section>
          </div>
          <div className="column">
            <section class="hero is-medium is-dark is-bold">
            <span className="tag is-success is-large">#Completed</span>
            {completed}
            </section>
          </div>
      </div>
    );
  }
}

//find keywords and keyphrases
const annotate=function(obj){
  var data=[];
  retext()
    .use(keywords)
    .process(obj, function (err, file) {
      if (err) throw err;

      //Keywords
      file.data.keywords.forEach(function (keyword) {
        var obj=nlcstToString(keyword.matches[0].node);
        data.push(obj +"  , ");
      });

      //keyphrases
      file.data.keyphrases.forEach(function (phrase) {
        var obj=phrase.matches[0].nodes.map(nlcstToString).join('');
        data.push(obj+" ,  ");
      });

      //console.log(data);
    }
  );
 return data;
}

export default Frontpage;
