import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';


const DailogBox =({actions,open,handleClose,pokeduxDetails})=>
{
    return (
        <Dialog
            title="Pokemon Details"
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={handleClose}
            autoScrollBodyContent={true}
        >
            <List>
                <ListItem
                    primaryText="Name"
                    secondaryText={pokeduxDetails.name}
                />
                <ListItem
                    primaryText="Weight"
                    secondaryText={pokeduxDetails.weight}
                />
                <ListItem
                    primaryText="Height"
                    secondaryText={pokeduxDetails.height}
                />
                <ListItem
                    primaryText="Base Experience"
                    secondaryText={pokeduxDetails.base_experience}
                />
            </List>
        </Dialog>
    );
}
export {DailogBox};