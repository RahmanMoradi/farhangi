const EnamadSeal = () => {
    const enamadHTML = `
        <div class="flex mt-2">
            <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=673275&Code=mNTZ3H9V4vIwclla7vlHFP6MqhmaGwmG'>
                <img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=673275&Code=mNTZ3H9V4vIwclla7vlHFP6MqhmaGwmG' alt='' style='cursor:pointer' code='mNTZ3H9V4vIwclla7vlHFP6MqhmaGwmG'/>
            </a>
        </div>
    `;
  
    return (
        <div dangerouslySetInnerHTML={{ __html: enamadHTML }} />
    );
  };
  
export default EnamadSeal;
  