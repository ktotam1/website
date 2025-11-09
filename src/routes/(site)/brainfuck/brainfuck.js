function findNextClosingBrace(input){
    let count = 0; 
    for(let i = 0; i < input.length; i++){
        if(input[i]=='[') count++;
        if(input[i]==']') count--;
        if(input[i]==']' && count == 0) return i
    }
    return -1; 
}

function findPreviousOpeningBrace(input){
    let count = 0; 
    // console.log("find [ in ", input)
    for(let i = 0; i < input.length; i++){
        if(input[input.length-i-1]==']') count++;
        if(input[input.length-i-1]=='[') count--;
        if(input[input.length-i-1]=='[' && count == 0) return i
    }
    return -1; 
}

export function interpret(input){
    let state = [0,0,0,0,0,0]
    let pos = 0
    let output = ""
    let errors; 
    mainloop:   
        for(let i = 0; i < input.length; i++) {
            let c = input[i];
            while(state.length<pos+1) state.push(0);
            switch(c){
                case '+': state[pos]=(state[pos]+1)%255; break;
                case '-': state[pos]=(state[pos]-1)%255; if(state[pos]<0) state[pos]+=255; break;
                case '>': pos++; break;
                case '<': pos = Math.max(0, pos-1); break;
                case '[': if(state[pos]==0){
                                let plus = findNextClosingBrace(input.slice(i,input.length))
                                if(plus == -1){
                                    errors = `no closing brace matches [ @ ${i}`
                                    break mainloop; 
                                }
                                console.log("jump forward", pos, i, plus)
                                i += plus;
                                break; 
                            }
                            console.log("forward")
                            break;
                case ']': 
                    let plus = findPreviousOpeningBrace(input.slice(0,i+1))
                    if(plus == -1){
                        errors = `no opening brace matches ] @ ${i}`
                        break mainloop; 
                    }
                    console.log("jump back", i, plus, i-plus)
                    i -= plus + 1;
                    break; 
                case '.': output+=String.fromCharCode(state[pos]); break;
                case ',': state[pos]=0; break;
            }   
            while(state.length<pos+1) state.push(0);
        }

    return {state, output, pos, errors}
}