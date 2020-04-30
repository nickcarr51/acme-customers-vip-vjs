const app = document.querySelector('#app');

const customers = [
    { id: 1, name: 'moe', email: 'moe@gmail.com', isVIP: true, dateJoined: '07/05/2015'},
    { id: 2, name: 'larry', isVIP: true, email: 'larry@gmail.com', dateJoined: '01/01/2019'},
    { id: 4, name: 'shep', email: 'shep@gmail.com', dateJoined: '03/19/2000'},
   ];


const createHeader = () => {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerContainer');

    const header = document.createElement('h1');
    header.innerHTML = 'ACME Customers VIP';

    headerContainer.appendChild(header);

    return headerContainer;
}

const createForm = () => {
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');

    const form = document.createElement('form');
    form.classList.add('form');

    const nameInput = document.createElement('input');
    const dateInput = document.createElement('input');

    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('checkBoxDiv');

    const label = document.createElement('label');
    label.innerHTML = 'VIP';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    checkBoxDiv.appendChild(label);
    checkBoxDiv.appendChild(checkBox);

    const button = document.createElement('button');
    button.innerHTML = 'Create';
    button.classList.add('button');

    button.addEventListener('click', ev => {
        ev.preventDefault();
        let addCustomer = {name: nameInput.value, dateJoined: dateInput.value};
        if (checkBox.checked === true) {
            addCustomer.isVIP = true;
        }

        customers.push(addCustomer);
        // localStorage.setItem(JSON.stringify(state));
        render();
    })

    form.appendChild(nameInput);
    form.appendChild(dateInput)
    form.appendChild(checkBoxDiv)
    form.appendChild(button);
    formContainer.appendChild(form);

    return formContainer;
}

const createCustomerContainer = () => {
    const customerContainer = document.createElement('div');
    customerContainer.classList.add('customerContainer');
    

    return customerContainer;
}

const createCustomerCard = (customer) => {
    const customerCard = document.createElement('div');

    if (customer.isVIP) {
        customerCard.classList.add('customerCardVIP');
    } else {
        customerCard.classList.add('customerCard');
    }


    const customerText = document.createElement('h3');
    customerText.innerHTML = `${customer.name} joined on ${customer.dateJoined} and has been a member for ${Math.round(100 * (Date.now() - Date.parse(customer.dateJoined))/(1000*60*60*24*364.25))/100} years.`

    customerCard.appendChild(customerText);

    return customerCard;
}


const render = () => {
    app.innerHTML = '';
    app.appendChild(createHeader());
    app.appendChild(createForm());
    const customerBody = createCustomerContainer();

    customers.sort((a, b) => Date.parse(a.dateJoined) - Date.parse(b.dateJoined));
    customers.forEach(customer => {
        let newCustomer = createCustomerCard(customer);
        customerBody.appendChild(newCustomer);
    })
    app.appendChild(customerBody);
}

render();