# Realistic Fire Simulation  

## Materials & Behaviours  

### Basic Behavior for flammable substances:
When heated above $Min_Burn_Temp with at least one neighboring **\#00 Air** and $Current_Fuel is at least 1, will release **\# 09 Gas** and reduce $Current_Fuel by 1.  
Same Behavior as above but with $Current_Wax instead of $Current_Fuel
If touching at least 2 **\#10 Fire** and at least 1 **\00 Air**, Converts into **\#10 Fire** with temperature $Burn_Release_Temp.  
If touching **\#06 Wax** while $Current_Wax is less than $Max_Wax, will remove the nearby wax and increase $Current_Wax.  

### \#00 Air
Does nothing, at least by itself.
### \#01 Paper  

### \#02 Cardboard  

### \#03 Wood  


### \#04 Coal  


### \#05 String  


### \#06 Wax  


### \#07 Liquid Wax  


### \#08 Gaseous Wax  


### \#09 Gas  


#### \#10 Fire  
