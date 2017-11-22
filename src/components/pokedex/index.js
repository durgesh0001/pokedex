import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPokidexData,fetchPokidexDataById} from '../../actions';
import {AgGridReact} from "ag-grid-react";
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {DailogBox} from '../dialog/dailog'
import CircularProgress from 'material-ui/CircularProgress';

class Pokedux extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            columnDefs: [
                {
                    headerName: "Name",
                    field: "name",
                    width: 500,
                    filter:'text',
                },
                {
                    headerName: "View",
                    field: "url",
                    width: 90,
                    cellRenderer: this.renderLink,
                    filter:'set',
                    suppressMenu:true

                }
            ],
            autoGroupColumnDef: {
                headerName: "Group",
                width: 200,
                field: "name",
                valueGetter: function (params) {
                    if (params.node.group) {
                        return params.node.key;
                    } else {
                        return params.data[params.colDef.field];
                    }
                },
                headerCheckboxSelection: true,
                cellRenderer: "group",
                cellRendererParams: {checkbox: true}
            },
            rowSelection: "multiple",
            rowGroupPanelShow: "always",
            pivotPanelShow: "always",
        };
    }


    /*
     @method: handleClose
     @desc: close dailog box
     */
    handleClose = () => {
        this.setState({open: false});
    };

    /*
    @method: onPageSizeChanged
    @desc: setting page size
    */
    onPageSizeChanged(newPageSize) {
        var value = document.getElementById("page-size").value;
        this.gridApi.paginationSetPageSize(Number(value));
    }

    /*
    @method: renderLink
    @desc: render link
*/
    renderLink() {
        let returnHtml = "";
        returnHtml = '<input type="button"  href="javascript:void(0);" class="btn btn-primary"  value="View" title="View">';
        return returnHtml;
    }


    /*
   @method: viewDetails
   @desc: view detail
   */
    viewDetails(event) {
        this.props.fetchPokidexDataById(event.value,() => {
            this.setState({open: true});
        });
    }

    /*
   @method: onGridReady
   @desc: setting grid option
   */
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        const updateData = data => {
            params.api.setRowData(data);
        };
        this.props.fetchPokidexData(() => {
            updateData(this.props.pokedux_data);
        });

    }

    /*
   @method: renderAgGrid
   @desc: render ag grid
   */
    renderAgGrid()
    {

        if(this.props.loading)
        {
          return(
              <div style={{align:'center'}}>
              <CircularProgress size={60} thickness={7} />
              </div>
          );
        }
        else
        {
            return(
                <AgGridReact
                    id="myGrid"
                    columnDefs={this.state.columnDefs}
                    enableSorting={true}
                    enableFilter={true}
                    floatingFilter={true}
                    suppressRowClickSelection={true}
                    groupSelectsChildren={true}
                    debug={true}
                    rowSelection={this.state.rowSelection}
                    enableColResize={true}
                    enableRangeSelection={true}
                    pagination={true}
                    onCellClicked={this.viewDetails.bind(this)}
                    onGridReady={this.onGridReady.bind(this)}
                />
            );
        }
    }

    /*
   @method: renderTableGrid
   @desc: render table grid
   */
    renderTableGrid()
    {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        let containerStyle = {
            height: 400,
            width: null
        };
            return(
                <div>
                    <CardHeader
                        title="Pokemon"
                        subtitle="pokedex"
                    />
                    <div>
                        <DailogBox actions={actions} open={this.state.open} handleClose={this.handleClose} pokeduxDetails={this.props.pokedux_details}/>
                    </div>
                    <div>
                        Page Size:
                        <select onChange={this.onPageSizeChanged.bind(this)} id="page-size">
                            <option value="10" selected="">
                                10
                            </option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div
                        style={containerStyle} className="ag-fresh"
                    >
                        {this.renderAgGrid()}
                    </div>
                </div>

            );
    }

    /*
  @method: render
  @desc:
  */
    render() {
        return (
            <Card>
                {this.renderTableGrid()}
            </Card>
        );
    }
}

const mapStateToProps = ({pokedux}) => {
    const {pokedux_data, error, loading,pokedux_details} = pokedux;
    return {pokedux_data, error, loading,pokedux_details};

};

export default connect(mapStateToProps, {fetchPokidexData,fetchPokidexDataById})(Pokedux);

