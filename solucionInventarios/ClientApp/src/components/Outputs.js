import { useEffect, useState } from 'react';
import {
    Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText, Input, ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import axios from 'axios';
import './Inputs.css';
import { NavLink } from 'react-router-dom';
export default function Outputs() {

    const [search, setSearch] = useState("");
    const [elements, setElements] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modal, setModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newId, setNewId] = useState(0);
    const [newStock, setNewStock] = useState(0);
    const [newFile, setNewFile] = useState(null);
    const [newSerie, setNewSerie] = useState("");
    const [newModel, setNewModel] = useState("");
    const toggle = () => setModal(!modal);
    const [dropdownOpen, setOpen] = useState(false);
    const toggle_dwn_tipo = () => setOpen(!dropdownOpen);
    const [dropdownOpenMarca, setOpenMarca] = useState(false);
    const toggle_dwn_marca = () => setOpenMarca(!dropdownOpenMarca);
    const [tipos, setTipos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [brand, setBrand] = useState(null);
    const [type, setType] = useState(null);
    const onChangeHandler = (event) => {

        setSearch(event.target.value);
        searchArticles(event.target.value);
        if (event.target.value.length === 0) {
            setElements([]);
        }
    };

    const onChangeHandlerNumber = ( event, id, stock ) => {
        const { value } = event.target;
        if (value <= stock) {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, count: value } : item
                )
            );
        } else {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, count: stock } : item
                )
            );
        }

    };

    const getTypes = () => {
        axios.get(
            'http://localhost:5183/api/tipo',
            {
                headers: {
           
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setTipos(response.data)
        });
    }

    const getBrands = () => {
        axios.get(
            'http://localhost:5183/api/marca',
            {
                headers: {

                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setMarcas(response.data)
        });
    }

    const onChangeHandlerNumberNewStock = event => {
        const { value } = event.target;
        if (value >= 0) {
            setNewStock(value); 
        }

    };


    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            setNewFile(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
    };


    const getLastId = () => {
        axios.get(
            'http://localhost:5183/api/articulo/getLastId',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setNewId(response.data + 1)
        });
    }

    useEffect(() => {
        searchArticles(search);
        getLastId();
        getTypes();
        getBrands();
    }, [search, newId]);

    const searchArticles = async (query) => {
        axios.post(
            'http://localhost:5183/api/articulo/searchArticle', JSON.stringify({ value: query }) ,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            if(query !== "")
                setElements(response.data)
            else
                setElements([])
        });
    }

    const insertArticle = () => {
        const formData = new FormData();
        formData.append('id', newId);
        formData.append('descripcion', newName);
        formData.append('stock', newStock);
        formData.append('imagen', selectedFile);
        formData.append('noSerie', newSerie);
        formData.append('idMarca', brand.id);
        formData.append('idTipo', type.id);
        formData.append('modelo', newModel);
        // Realiza la solicitud POST con Axios
        axios.post('http://localhost:5183/api/articulo/addArticle', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(respuesta => {
                console.log(respuesta);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const addItem = (item) => {
        const tempArr = [...items]; // Nueva instancia de la matriz
        let obj = tempArr.find(o => o.id === item.id);
        if (typeof (obj) === "undefined") {
            const newObject = Object.assign({}, item, { count: 0 })
            tempArr.push(newObject);
        }
        setItems(tempArr); // Actualización del estado
    }

    const deleteItem = (item) => {
        const tempArr = [...items]; // Nueva instancia de la matriz
        let objIdx = tempArr.findIndex(o => o.id === item.id);
        tempArr.splice(objIdx, 1);
        setItems(tempArr); // Actualización del estado
    }

    const executeEntries = async () => {
        items.map((e, idx) => {
            console.log(parseInt(e.count))
            axios.put('http://localhost:5183/api/articulo/' + e.id + '/stock', JSON.stringify({ newStock: parseInt(e.count)*-1 }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        });
        setItems([]);
    }

    return (
        <div className="main-div">
            <div className="static-header">
                <span className="home-text">Salidas</span>
            </div>

            <div className = "top-container">
                <span>Busca un elemento por ID o nombre: </span>
                <div>
                    <input placeholder="Buscar" onChange={(event) =>  onChangeHandler(event) } value={search} className="search-bar"></input>
                    {
                        (elements.length > 0) ?
                            <div className = "search-dropdown">
                                <div>
                                    {
                                        elements.map((e, idx) => {
                                            return <div className="items" onClick={() => { addItem(e); setSearch("") }} key={idx}> <img className="item-pic" src={ e.uri } /> {e.descripcion} </div>
                                        })
                                    }
                                </div>
                            </div> :
                            <div>
                        
                            </div>
                    }
                </div>
                <div>
                    <Button style={{marginLeft: '30px', marginTop: '-5px'} } onClick={toggle} color="primary">Crear nuevo artículo</Button>
                </div>
            </div>
                    <div>
                        <Table
                    responsive
                            className = "table-items"
                        >
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Stock
                                    </th>
                                    <th>
                                        Imagen
                                    </th>
                                    <th>
                                        Sacar
                                    </th>
                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (items.length > 0) ?
                                        items.map((i, idx) => {
                                            return (
                                                <tr key={ idx}>
                                                    <th scope="row">
                                                        { i.id }
                                                    </th>
                                                    <td>
                                                        { i.descripcion}
                                                    </td>
                                                    <td>
                                                        { i.stock }
                                                    </td>
                                                    <td>
                                                        <img className = "img-table" src={ i.uri  } />
                                                    </td>
                                                    <td>
                                                        <input key={i.id} onChange={(value)=>onChangeHandlerNumber(value, i.id, i.stock)} value={ i.count } className = "number-counter" type="number"/>
                                                    </td>
                                                    <td>
                                                        <img onClick={() => deleteItem(i)} className="trash" src= "./img/delete.png" ></img>
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                        <>
                                        </>
                                }

                            </tbody>
                </Table>
                <div>
                    <Button onClick={() => { executeEntries() }} color="primary" className= "execute-button">Confirmar salidas  <img width = "20px" src = "./img/cheque.png"/></Button>
                </div>
            </div>
            
            <Modal isOpen={modal} toggle={toggle} centered={true} size={ 'lg' }>
                <ModalHeader toggle={toggle}>Agregar artículo</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' } }>
                            ID
                        </InputGroupText>
                        <Input value={ newId } placeholder = "Default autoincrementable"/>
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Nombre
                        </InputGroupText>
                        <Input value={newName} onChange={(event) => { setNewName(event.target.value) } } placeholder="Descripcion" />
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Modelo
                        </InputGroupText>
                        <Input value={newModel} onChange={(event) => { setNewModel(event.target.value) }} placeholder="Modelo" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Número de serie
                        </InputGroupText>
                        <Input value={newSerie} placeholder={ "xxx-xxx-xxxx" } onChange={(event) => { setNewSerie(event.target.value) }}  value={newSerie} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Stock
                        </InputGroupText>
                        <Input value={newStock} onChange={ onChangeHandlerNumberNewStock } type="number" value={ newStock } />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Tipo
                        </InputGroupText>
                        <ButtonDropdown style={{ background: '#FFF' }} isOpen={dropdownOpen} toggle={toggle_dwn_tipo}>
                            <DropdownToggle caret>{ (type !== null) ? type?.name : 'Selecciona un tipo' }</DropdownToggle>
                            <DropdownMenu >
                                {
                                    (tipos?.length) ?
                                        <div>
                                            {tipos.map((e, idx) => {
                                                return (<div key={ idx }>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => { setType({id: e.id, name: e.descripcion}) } }>{ e.descripcion }</DropdownItem></div>)
                                            }) }
                                        </div> :
                                        <div>
                                        </div>
                                }
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Marca
                        </InputGroupText>
                        <ButtonDropdown style={{ background: '#FFF' }} isOpen={dropdownOpenMarca} toggle={toggle_dwn_marca}>
                            <DropdownToggle caret>{(brand !== null) ? brand?.name : 'Selecciona una marca'}</DropdownToggle>
                            <DropdownMenu >
                                {
                                    (marcas?.length) ?
                                        <div>
                                            {marcas.map((e, idx) => {
                                                return (<div key={idx}>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => { setBrand({ id: e.id, name: e.descripcion }) }}>{e.descripcion}</DropdownItem></div>)
                                            })}
                                        </div> :
                                        <div>
                                        </div>
                                }
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupText style={{ width: '150px' }}>
                            Imagen
                        </InputGroupText>
                        <label className="file-input">
                            Seleccionar archivo
                            <input type="file" accept="image/*" className="my-file-input" onChange={handleImageUpload} />
                            {newFile && (
                                <img style={{ width: '100px' } } src={newFile} alt="Imagen cargada" />
                            )}
                        </label>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={insertArticle}>
                        Agregar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}